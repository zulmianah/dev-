#include "joueur.h"
#include <QFile>
#include <QString>
string Joueur::getNom() const
{
    return nom;
}

void Joueur::setNom(const string &value)
{
    nom = value;
}

Joueur::Joueur()
{
    
}
