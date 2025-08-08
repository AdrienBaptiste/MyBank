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
    nano \
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

# Copier la configuration Apache personnalisée (si tu en as une)
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Activer ta conf Apache
RUN a2dissite 000-default && a2ensite 000-default

# Fixer les permissions pour Apache
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Installer les dépendances avec les dev-deps
RUN composer install --prefer-dist --no-interaction

# Pas de cache:clear ici, Symfony le fait dynamiquement en dev
# Tu peux aussi ajouter une commande post-install si nécessaire

# Exposer le port Apache
EXPOSE 80

# Commande de démarrage Apache
CMD ["apache2-foreground"]
