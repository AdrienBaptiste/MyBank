# Utiliser PHP 8.3 avec Apache
FROM php:8.3-apache

# Activer les modules Apache nécessaires
RUN a2enmod rewrite

# Installer les extensions PHP nécessaires
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    zip \
    opcache 

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers du projet Symfony
COPY . .

# Copier la configuration Apache personnalisée
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Supprimer la configuration par défaut (important)
RUN a2dissite 000-default

# Activer la configuration personnalisée
RUN a2ensite 000-default

# Fixer les permissions des fichiers du projet pour Apache
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Installer les dépendances Symfony
RUN composer install --no-dev --optimize-autoloader

# Exposer le port 80 pour Apache
EXPOSE 80

# Commande par défaut pour Apache
CMD ["apache2-foreground"]
