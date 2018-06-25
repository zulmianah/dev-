#ifndef PERSONNAGE_H
#define PERSONNAGE_H
#include "objet.h"

class Personnage: public Objet
{
private:
    int vitesse, yinit;
public:
    Personnage(int x, int y);
    void avancer();
    int getVitesse() const;
    void setVitesse(int value);
    int getYinit() const;
    void setYinit(int value);
};
#endif // PERSONNAGE_H
