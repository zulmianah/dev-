#ifndef ROUTE_H
#define ROUTE_H
#include "objet.h"

class Route: public Objet
{
public:
    Route();
    Route(int x, int y, int w, int h);
    QList<Route*> *creation(int espace, int c, int x, int y, int w, int h) const;
};

#endif // ROUTE_H
