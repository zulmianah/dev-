#include "brickmenu.h"
#include <QMenu>
#include <QMenuBar>
#include <QLabel>
#include "joueur.h"
#include <QString>
#include <QStackedWidget>
#include <QVBoxLayout>
#include <QCoreApplication>
#include <QApplication>
#include <QtGui>
#include <QPen>
#include <QRect>
#include <QBrush>
#include <QGraphicsScene>
#include <QOpenGLWidget>
#include <QLinearGradient>
#include <QKeyEvent>
#include <QGraphicsView>
#include <QKeyEvent>
#include <QDebug>
#include <iostream>
#include <QPaintEvent>
#include <QPicture>
#include <QPointF>
#include <QPixmap>
using namespace std;

BrickMenu::BrickMenu(QWidget *parent) : QMainWindow(parent)
{
    mobile->setYinit(190);
    QString nom = j.changer();

    QLabel *label = new QLabel(this);
    label->move(250,50);
    label->setText("NOM:\n"+nom);

    QAction *bcj = new QAction("&Changer de joueur", this);
    bcj->setIcon(QIcon("C:/Users/P10A_ZAORA_ZULMIANAH/Downloads/Documents/qt/bcj.png"));
    QAction *bnj = new QAction("&Nouveau Jeu", this);
    bnj->setIcon(QIcon("C:/Users/P10A_ZAORA_ZULMIANAH/Downloads/Documents/qt/bnj.png"));
    QAction *brj = new QAction("&Reprendre Jeu", this);
    QAction *bqj = new QAction("&Quiter", this);
    bqj->setIcon(QIcon("C:/Users/P10A_ZAORA_ZULMIANAH/Downloads/Documents/qt/bqj.png"));

    QMenu *menu;
    menu = menuBar()->addMenu("&Menu");
    menu->addAction(bcj);
    menu->addAction(bnj);
    menu->addAction(brj);
    menu->addAction(bqj);

    resize(350, 250);
    setWindowTitle("Mario Bros");
    show();

    connect(bqj, SIGNAL(triggered()), qApp, SLOT(quit()));
    connect(bcj, &QAction::triggered,this , &BrickMenu::changerJoueur);
    connect(bnj, &QAction::triggered,this , &BrickMenu::nouveauJeu);
}
void BrickMenu::paintEvent(QPaintEvent *event) {
    QWidget::paintEvent(event);

    QPixmap pixmap2("C:/Users/P10A_ZAORA_ZULMIANAH/Pictures/Camera Roll/WIN_20180622_09_03_41_Pro.jpg");

    QPainter mobilep(this);
    mobilep.setBrush(Qt::gray);
    mobilep.setPen( QPen(Qt::black,2));
    mobilep.drawPixmap(mobile->getX(), mobile->getY(), mobile->getW(), mobile->getH(),pixmap2);
    //mobilep.drawRect(mobile->getX(), mobile->getY(), mobile->getW(), mobile->getH());

    QPainter trousp(this);
    trousp.setBrush(Qt::black);
    trousp.setPen(QPen(Qt::black,0));
    for (int i = 0; i<trous->length(); i++) trousp.drawRect(trous->at(i)->getX(),trous->at(i)->getY(),trous->at(i)->getW(),trous->at(i)->getH());

    QPainter routesp(this);
    routesp.setBrush(Qt::green);
    routesp.setPen(QPen(Qt::green,0));

    for (int i = 0; i<routes->length(); i++) routesp.drawRect(routes->at(i)->getX(),routes->at(i)->getY(),routes->at(i)->getW(),routes->at(i)->getH());
}
bool BrickMenu::tomber(){
    for (int i = 0; i<trous->length(); i++) if(trous->at(i)->getX()<mobile->getX() && (trous->at(i)->getX()+trous->at(i)->getW())>mobile->getX()){
        mobile->setY(mobile->getY()+2);
        return true;
    }
    /*if((routes->at(0)->getX()<mobile->getX() && routes->at(0)->getW()>mobile->getX()) || (routes->at(1)->getX()<mobile->getX() && routes->at(1)->getW()>mobile->getX()) || (routes->at(2)->getX()<mobile->getX() && routes->at(2)->getW()>mobile->getX())){
        mobile->setY(mobile->getY()+6);
        return true;
    }*/
    return false;
}
void BrickMenu::sauter(){
    int ecart = 1;
    int bond = 180;
    while(mobile->getY()>= bond){
        mobile->setY(mobile->getY()-ecart);
        mobile->setX(mobile->getX()+ecart);
        repaint();
    }
    while(mobile->getY()<= mobile->getYinit()){
        mobile->setY(mobile->getY()+ecart);
        mobile->setX(mobile->getX()+ecart);
        repaint();
    }
}
void BrickMenu::sauterinverse(){
    int ecart = 1;
    int bond = 185;
    while(mobile->getY()>= bond){
        mobile->setY(mobile->getY()-ecart);
        mobile->setX(mobile->getX()-ecart);
        repaint();
    }
    while(mobile->getY()<= mobile->getYinit()){
        mobile->setY(mobile->getY()+ecart);
        mobile->setX(mobile->getX()-ecart);
        repaint();
    }
}
void BrickMenu::keyPressEvent(QKeyEvent *event){
    if(event->key() == Qt::Key_F && !tomber())
    {
        mobile->setX(mobile->getX()+2);
    }
    if(event->key() == Qt::Key_S  && !tomber())
    {
        mobile->setX(mobile->getX()-2);
    }
    if(event->key() == Qt::Key_B && tomber())
    {
        sauter();
    }
    if(event->key() == Qt::Key_E && !tomber())
    {
        sauter();
    }
    if(event->key() == Qt::Key_Z)
    {
        sauter();
    }
    repaint();
}
void BrickMenu::changerJoueur(){
}

void BrickMenu::nouveauJeu(){
    mobile->setX(0);
    mobile->setY(mobile->getYinit());
    repaint();
}
