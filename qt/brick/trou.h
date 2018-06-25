#ifndef TROU_H
#define TROU_H
#include "objet.h"

class Trou: public Objet
{
public:
    Trou();
    Trou(int x, int y, int w, int h);
    QList<Trou*> *creation(int espace, int c, int x, int y, int w, int h) const;
};

#endif // TROU_H
