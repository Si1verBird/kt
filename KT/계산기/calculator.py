import sys
from PyQt5.QtWidgets import (QApplication, QWidget, QGridLayout, QPushButton, QLineEdit, QVBoxLayout)
from PyQt5.QtCore import Qt

class Calculator(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self.setWindowTitle('iPhone 스타일 계산기')
        self.setFixedSize(320, 480)

        vbox = QVBoxLayout()
        self.display = QLineEdit('0')
        self.display.setReadOnly(True)
        self.display.setAlignment(Qt.AlignRight)
        self.display.setFixedHeight(60)
        self.display.setStyleSheet('font-size: 28px;')
        vbox.addWidget(self.display)

        grid = QGridLayout()
        buttons = [
            ['C', '+/-', '%', '/'],
            ['7', '8', '9', 'x'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '=']
        ]

        for row, row_values in enumerate(buttons):
            for col, btn_text in enumerate(row_values):
                if btn_text == '0':
                    btn = QPushButton(btn_text)
                    btn.setFixedSize(140, 60)
                    grid.addWidget(btn, row, col, 1, 2)
                    col += 1
                else:
                    btn = QPushButton(btn_text)
                    btn.setFixedSize(60, 60)
                    grid.addWidget(btn, row, col)
                btn.setStyleSheet('font-size: 20px;')
                btn.clicked.connect(self.onButtonClick)
        vbox.addLayout(grid)
        self.setLayout(vbox)

    def onButtonClick(self):
        # 버튼을 눌러도 아무 동작도 하지 않음 (프론트만 동작)
        pass

def main():
    app = QApplication(sys.argv)
    calc = Calculator()
    calc.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main() 