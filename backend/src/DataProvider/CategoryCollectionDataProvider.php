<?php

namespace App\DataProvider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CategoryCollectionDataProvider implements ProviderInterface
{
    private EntityManagerInterface $em;
    private TokenStorageInterface $tokenStorage;

    public function __construct(EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->tokenStorage = $tokenStorage;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): iterable
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return [];
        }

        $user = $token->getUser();
        if (!$user) {
            return [];
        }

        // Retourner toutes les catégories appartenant à l'utilisateur connecté
        $qb = $this->em->createQueryBuilder();
        $qb->select('c')
            ->from(Category::class, 'c')
            ->where('c.user = :user')
            ->setParameter('user', $user)
            ->orderBy('c.title', 'ASC');

        return $qb->getQuery()->getResult();
    }
}