#include "route.h"

Route::Route()
{

}
Route::Route(int x, int y, int w, int h)
{
    setX(x);
    setY(y);
    setW(w);
    setH(h);
}
QList<Route*> *Route::creation(int espace, int c, int x, int y, int w, int h) const {
    QList<Route*> *val = new QList<Route*>();
    for(int i=0;i<c;i++){
        Route *temp = new Route(x,y,w,h);
        val->append(new Route(x,y,w,h));
        x += w+espace;
    }
    return val;
}
