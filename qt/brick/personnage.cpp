#include "Personnage.h"

int Personnage::getVitesse() const
{
    return vitesse;
}

void Personnage::setVitesse(int value)
{
    vitesse = value;
}

int Personnage::getYinit() const
{
    return yinit;
}

void Personnage::setYinit(int value)
{
    yinit = value;
}

Personnage::Personnage(int x, int y)
{
    setX(x);
    setY(y);
    setH(10);
    setW(10);
    setVitesse(2);
}
