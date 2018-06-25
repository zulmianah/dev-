#ifndef JOUEUR_H
#define JOUEUR_H
#include <string>
#include <QFile>
#include <QString>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include <iostream>
#include <QDebug>
using namespace std;
class Joueur
{
private:
    string nom;
public:
    Joueur();
    string getNom() const;
    void setNom(const string &value);

    QString changer(){
        QString val;
        QFile file;
        file.setFileName("C:/Users/P10A_ZAORA_ZULMIANAH/Documents/ITU/QT/brick/joueur.json");
        file.open(QIODevice::ReadOnly | QIODevice::Text);
        val = file.readAll();
        file.close();
        //qDebug() << "this: "+val;
        QJsonDocument d = QJsonDocument::fromJson(val.toUtf8());
        QJsonObject sett2 = d.object();
        QJsonValue value = sett2.value(QString("nom"));
        //qDebug() << value;
        //qDebug() << value.toString();
        val = value.toString();
        //qDebug() << val;
        return val;
    }
};

#endif // JOUEUR_H
