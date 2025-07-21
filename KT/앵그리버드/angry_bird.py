import pygame
import math
import sys
import os
import urllib.request

# 게임 초기화
pygame.init()

# 화면 크기
WIDTH, HEIGHT = 1200, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('앵그리버드')

# 색상
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BROWN = (139, 69, 19)
SKY = (135, 206, 235)
GREEN = (34, 139, 34)

# 물리 상수
GRAVITY = 0.5

# 새 이미지 경로
BIRD_IMG_PATH = os.path.join(os.path.dirname(__file__), 'redbird.png')
BIRD_IMG_URL = 'https://i.namu.wiki/i/GnBAlUWDl8Js1StMnuzyfkkJR62gouPvWZTxL3HvKrnQRi9HgMdcGB9QHJGK-X52tZyQPexat_fj7rlRXlD1EA.webp'

def ensure_bird_image():
    if not os.path.exists(BIRD_IMG_PATH):
        try:
            urllib.request.urlretrieve(BIRD_IMG_URL, BIRD_IMG_PATH)
        except Exception as e:
            print('새 이미지를 다운로드할 수 없습니다:', e)
            return False
    return True

def load_bird():
    if ensure_bird_image():
        img = pygame.image.load(BIRD_IMG_PATH).convert_alpha()
        img = pygame.transform.smoothscale(img, (44, 44))
        return img
    else:
        # 이미지가 없으면 기본 원으로 대체
        surf = pygame.Surface((44, 44), pygame.SRCALPHA)
        pygame.draw.ellipse(surf, RED, (2, 6, 40, 32))
        pygame.draw.ellipse(surf, (0,0,0), (2, 6, 40, 32), 2)
        return surf

class Bird:
    def __init__(self, x, y):
        self.init_x = x
        self.init_y = y
        self.x = x
        self.y = y
        self.radius = 20
        self.img = load_bird()
        self.vel_x = 0
        self.vel_y = 0
        self.launched = False
        self.trail = []

    def draw(self, surface, camera_x):
        surface.blit(self.img, (self.x - camera_x - self.radius, self.y - self.radius))
        for tx, ty in self.trail:
            pygame.draw.circle(surface, (200, 0, 0, 100), (int(tx - camera_x), int(ty)), 5)

    def update(self):
        if self.launched:
            self.trail.append((self.x, self.y))
            if len(self.trail) > 30:
                self.trail.pop(0)
            self.x += self.vel_x
            self.y += self.vel_y
            self.vel_y += GRAVITY

    def reset(self):
        self.x = self.init_x
        self.y = self.init_y
        self.vel_x = 0
        self.vel_y = 0
        self.launched = False
        self.trail = []

# 구조물 클래스
class Block:
    def __init__(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h
        self.color = BROWN
        self.alive = True

    def draw(self, surface, camera_x):
        if self.alive:
            pygame.draw.rect(surface, self.color, (self.x - camera_x, self.y, self.w, self.h))

    def collide(self, bird):
        if not self.alive:
            return False
        bx, by = bird.x, bird.y
        if (self.x < bx < self.x + self.w) and (self.y < by < self.y + self.h):
            self.alive = False
            return True
        return False

# 새총 위치
SLING_X, SLING_Y = 150, HEIGHT - 150

# 게임 오브젝트 생성
bird = Bird(SLING_X, SLING_Y)
blocks = [
    Block(700, HEIGHT - 100, 60, 100),
    Block(800, HEIGHT - 150, 60, 150),
    Block(900, HEIGHT - 100, 60, 100),
]

clock = pygame.time.Clock()

# 카메라 위치
camera_x = 0

# 새총 조작 변수
dragging = False
power = 0
angle = 0

# 메인 루프
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif event.type == pygame.MOUSEBUTTONDOWN:
            mx, my = pygame.mouse.get_pos()
            if not bird.launched and math.hypot(mx - (SLING_X - camera_x), my - SLING_Y) < 40:
                dragging = True
        elif event.type == pygame.MOUSEBUTTONUP:
            if dragging:
                dragging = False
                bird.launched = True
                # 발사 방향: 당긴 벡터의 반대 방향
                mx, my = pygame.mouse.get_pos()
                dx = mx - (SLING_X - camera_x)
                dy = my - SLING_Y
                pull_len = min(math.hypot(dx, dy), 100)
                if pull_len > 0:
                    pull_angle = math.atan2(dy, dx)
                    power = min(pull_len * 0.2, 15)
                    bird.vel_x = -power * math.cos(pull_angle)
                    bird.vel_y = -power * math.sin(pull_angle)
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_r:
                bird.reset()
                for block in blocks:
                    block.alive = True
                camera_x = 0

    if dragging:
        mx, my = pygame.mouse.get_pos()
        dx = mx - (SLING_X - camera_x)
        dy = my - SLING_Y
        pull_len = min(math.hypot(dx, dy), 100)
        # 새를 커서 방향으로 당김
        if pull_len > 0:
            pull_angle = math.atan2(dy, dx)
            bird.x = SLING_X + math.cos(pull_angle) * pull_len
            bird.y = SLING_Y + math.sin(pull_angle) * pull_len
        else:
            bird.x = SLING_X
            bird.y = SLING_Y
    elif not bird.launched:
        bird.x = SLING_X
        bird.y = SLING_Y

    # 새 업데이트
    bird.update()

    # 충돌 체크
    for block in blocks:
        if block.collide(bird):
            bird.vel_x *= 0.5
            bird.vel_y *= 0.5

    # 카메라 이동 (새를 따라감)
    if bird.launched:
        camera_x = max(0, int(bird.x) - 200)
        camera_x = min(camera_x, 1000)

    # 배경 그리기
    screen.fill(SKY)
    # 구름
    for cx, cy, cw, ch in [(200,100,100,40),(500,80,120,50),(900,120,80,30),(1100,60,90,35)]:
        pygame.draw.ellipse(screen, (255,255,255), (cx-camera_x, cy, cw, ch))
    # 땅
    pygame.draw.rect(screen, GREEN, (0, HEIGHT - 50, WIDTH, 50))
    # 풀
    for gx in range(0, WIDTH, 40):
        base = HEIGHT - 50
        pygame.draw.line(screen, (0,100,0), (gx-camera_x, base), (gx-camera_x, base-20), 3)
        pygame.draw.arc(screen, (0,180,0), (gx-camera_x-8, base-25, 16, 20), math.pi, 2*math.pi, 2)
    # 꽃
    for fx in range(60, WIDTH, 120):
        fy = HEIGHT - 60
        pygame.draw.circle(screen, (255,255,0), (fx-camera_x, fy), 6)
        for i in range(5):
            angle = i * (2*math.pi/5)
            px = fx + int(12*math.cos(angle))
            py = fy + int(12*math.sin(angle))
            pygame.draw.circle(screen, (255,192,203), (px-camera_x, py), 5)

    # 구조물 그리기
    for block in blocks:
        block.draw(screen, camera_x)

    # 새총 그리기
    pygame.draw.line(screen, BLACK, (SLING_X - camera_x, SLING_Y), (int(bird.x - camera_x), int(bird.y)), 5)
    pygame.draw.circle(screen, BLACK, (SLING_X - camera_x, SLING_Y), 25, 5)

    # 새 그리기
    bird.draw(screen, camera_x)

    # 안내문구
    font = pygame.font.SysFont(None, 36)
    if not bird.launched:
        txt = font.render('마우스로 새총을 당겨서 발사하세요! (R: 리셋)', True, BLACK)
        screen.blit(txt, (30, 30))
    elif bird.launched and bird.y > HEIGHT:
        txt = font.render('R키로 다시 시작하세요!', True, BLACK)
        screen.blit(txt, (30, 30))

    pygame.display.flip()
    clock.tick(60) 