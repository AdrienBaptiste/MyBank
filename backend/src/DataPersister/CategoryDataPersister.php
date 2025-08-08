<?php

namespace App\DataPersister;

use ApiPlatform\Metadata\Operation as ApiOperation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Category;
use Symfony\Bundle\SecurityBundle\Security;

class CategoryDataPersister implements ProcessorInterface
{
    public function __construct(
        private Security $security,
        private ProcessorInterface $decorated
    ) {}

    public function process(mixed $data, ApiOperation $operation, array $uriVariables = [], array $context = [])
    {
        if ($data instanceof Category) {
            $user = $this->security->getUser();
            if ($user && $data->getUser() === null) {
                $data->setUser($user);
            }
        }

        return $this->decorated->process($data, $operation, $uriVariables, $context);
    }
}
