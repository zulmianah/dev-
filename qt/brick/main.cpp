#include <QApplication>
#include <iostream>
#include <QPushButton>
#include <QWidget>
#include "brickmenu.h"
using namespace std;
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    BrickMenu window;
    return a.exec();
}
