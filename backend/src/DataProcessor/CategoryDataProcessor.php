<?php

namespace App\DataProcessor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Category;
use Symfony\Bundle\SecurityBundle\Security;
use Throwable;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

class CategoryDataProcessor implements ProcessorInterface
{
    public function __construct(
        private Security $security,
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        error_log('CategoryDataProcessor: process called');
        if (!$data instanceof Category) {
            error_log('CategoryDataProcessor: data is not Category');
            return $data;
        }

        // Toujours assigner l'utilisateur connecté si non défini
        if (null === $data->getUser()) {
            $user = $this->security->getUser();
            if ($user) {
                error_log('CategoryDataProcessor: assigning current user to category');
                $data->setUser($user);
            } else {
                error_log('CategoryDataProcessor: no authenticated user found');
            }
        }

        $title = $data->getTitle();
        $userId = $data->getUser() ? $data->getUser()->getId() : null;
        error_log(sprintf('CategoryDataProcessor: delegating persist (title="%s", userId=%s)', (string) $title, var_export($userId, true)));
        try {
            $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            error_log('CategoryDataProcessor: persisted OK via Doctrine processor');
            return $result;
        } catch (Throwable $e) {
            error_log('CategoryDataProcessor: persist ERROR -> ' . get_class($e) . ': ' . $e->getMessage());
            error_log('CategoryDataProcessor: trace -> ' . $e->getTraceAsString());
            throw $e; // rethrow so API Platform returns proper error
        }
    }
}
