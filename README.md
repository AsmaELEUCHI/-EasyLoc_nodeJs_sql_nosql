# EasyLoc' - Système de Gestion des Données
EasyLoc' est une entreprise de location de voitures basée à Lyon, qui souhaite étendre ses services en numérisant ses données. Ce projet fournit une bibliothèque d'accès aux données pour la gestion des locations, des véhicules et des paiements, en utilisant à la fois une base de données relationnelle (SQL Server) et une base de données NoSQL (MongoDB).Ce projet a été réalisé dans le cadre de ma formation en développement web.
## Technologies Utilisées
- **Node.js v20.15.0**
- **SQL Server**
- **MongoDB v7.0.12**
## Fonctionnalités
### SQL Server
  - **Connexion à la Base de Données :** Connexion sécurisée à SQL Server pour accéder aux données.
  - **Gestion des Tables :**
    - Contract : Gestion des contrats de location (création, modification, suppression, et consultation).
    - Billing : Gestion des paiements (création, modification, suppression, et consultation).
  - **Opérations CRUD :** Création, lecture, mise à jour, et suppression de données pour les tables définies.
  - **Recoupement d'Informations :** Requêtes pour lister, filtrer et compter les contrats, les paiements, et les locations en retard ou impayées.
### MongoDB
  - **Connexion à la Base de Données :** Connexion sécurisée à MongoDB pour gérer les documents.
  - **Gestion des Documents :**
    - Customer : Création, modification, suppression, et recherche des documents clients.
    - Vehicle : Création, modification, suppression, et recherche des documents véhicules.
  - **Requêtes MongoDB :** Recherches basées sur le nom, le numéro d'immatriculation, et le kilométrage des véhicules.
## Installation
1. **Clonez le dépôt** :
   Ouvrez PowerShell et exécutez la commande suivante pour cloner le dépôt depuis GitHub :
   ```powershell
   
