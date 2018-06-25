#include "trou.h"

Trou::Trou(){

}
Trou::Trou(int x, int y, int w, int h)
{
    setX(x);
    setY(y);
    setW(w);
    setH(h);
}
QList<Trou*> *Trou::creation(int espace, int c, int x, int y, int w, int h) const {
    QList<Trou*> *val = new QList<Trou*>();
    for(int i=0;i<c;i++){
        Trou *temp = new Trou(x,y,w,h);
        val->append(new Trou(x,y,w,h));
        x += w+espace;
    }
    return val;
}
