#include <SoftwareSerial.h>
#include <SPI.h>
#include "RF24.h"
// The serial connection to the GPS module
SoftwareSerial ss(4, 3);
RF24 rf24(7, 8); // CE腳, CSN腳
const byte addr[] = "1Node";
const char msg[] = "nigger"
void setup(){
  Serial.begin(9600);
  ss.begin(9600);
  rf24.begin();
  rf24.setChannel(83);       // 設定頻道編號
  rf24.openWritingPipe(addr); // 設定通道位址
  rf24.setPALevel(RF24_PA_MIN);   // 設定廣播功率
  rf24.setDataRate(RF24_250KBPS); // 設定傳輸速率
  rf24.stopListening();       // 停止偵聽；設定成發射模式
}

void loop(){
  while (ss.available() > 0){
    // get the byte data from the GP
    byte gpsData = ss.read();
    Serial.write(gpsData);
  }
  rf24.write(&msg, sizeof(msg));  // 傳送資料
  delay(1000);
}