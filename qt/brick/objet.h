#ifndef OBJET_H
#define OBJET_H
#include <QWidget>

class Objet : public QWidget
{
private:
    float x,y,w,h;
public:
    Objet();
    float getX() const;
    void setX(float value);
    float getH() const;
    void setH(float value);
    float getY() const;
    void setY(float value);
    float getW() const;
    void setW(float value);
};

#endif // OBJET_H
