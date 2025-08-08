<?php

namespace App\Entity;

use App\Repository\OperationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['operation:read']],
    denormalizationContext: ['groups' => ['operation:write']],
    security: "is_granted('ROLE_USER')",
    operations: [
        // Collection operations (GET /operations, POST /operations)
        new \ApiPlatform\Metadata\GetCollection(
            provider: \App\DataProvider\OperationCollectionDataProvider::class,
            security: "is_granted('ROLE_USER')",
            securityMessage: 'You can only access your own operations.'
        ),
        new Post(
            security: "is_granted('ROLE_USER')"
        ),
        
        // Item operations (GET /operations/{id}, PUT /operations/{id}, DELETE /operations/{id})
        new Get(
            security: "object.getUser() == user",
            securityMessage: 'You can only access your own operation.'
        ),
        new Put(
            security: "object.getUser() == user"
        ),
        new Delete(
            security: "object.getUser() == user"
        )
    ]
)]

#[ORM\Entity(repositoryClass: OperationRepository::class)]
class Operation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['operation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['operation:read', 'operation:write'])]
    private ?string $label = null;

    #[ORM\Column]
    #[Groups(['operation:read', 'operation:write'])]
    private ?float $amount = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(['operation:read', 'operation:write'])]
    private ?\DateTimeImmutable $date = null;

    #[ORM\ManyToOne(inversedBy: 'operations')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    #[Groups(['operation:read', 'operation:write'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'operations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['operation:read'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
