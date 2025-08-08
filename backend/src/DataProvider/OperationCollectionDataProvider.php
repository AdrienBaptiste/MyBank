<?php

namespace App\DataProvider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Operation as OperationEntity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use ApiPlatform\Metadata\GetCollection;

final class OperationCollectionDataProvider implements ProviderInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private TokenStorageInterface $tokenStorage,
        private ProviderInterface $decorated
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Cibler explicitement la collection GET sur Operation
        if ($operation->getClass() !== OperationEntity::class || !($operation instanceof GetCollection)) {
            return $this->decorated->provide($operation, $uriVariables, $context);
        }

        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return [];
        }

        $user = $token->getUser();
        if (!$user) {
            return [];
        }

        // Toujours filtrer par l'utilisateur connecté
        return $this->entityManager->getRepository(OperationEntity::class)
            ->findBy(['user' => $user], ['date' => 'DESC', 'id' => 'DESC']);
    }
}