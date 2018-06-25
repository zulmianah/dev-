#ifndef BRICKMENU_H
#define BRICKMENU_H
#include <QMainWindow>
#include <QApplication>
#include <QPushButton>
#include "joueur.h"
#include "personnage.h"
#include <QGraphicsView>
#include <QOpenGLWidget>
#include <QBrush>
#include <QObject>
#include <QEvent>
#include <QObject>
#include <QWidget>
#include <QtGui>
#include <QKeyEvent>
#include <QPaintEvent>
#include <QList>
#include "trou.h"
#include "route.h"

class BrickMenu : public QMainWindow
{
protected:
    void paintEvent(QPaintEvent *event);
private:
    Trou *trou = new Trou();
    QList<Trou*> *trous = trou->creation(80,3,80,200,20,80);
    Route *route = new Route();
    QList<Route*> *routes = route->creation(20,4,0,200,80,80);
    Joueur j;
    Personnage *mobile = new Personnage(0,190);
    QPushButton button;
public slots:
    void nouveauJeu();
    void changerJoueur();
    void keyPressEvent(QKeyEvent *event);
public:
    bool tomber();
    void sauter();
    void sauterinverse();
    BrickMenu(QWidget *parent = 0);
    QOpenGLWidget *mario;
};
#endif // BRICKMENU_H
