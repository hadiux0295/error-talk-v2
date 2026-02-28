import time
import sys
import random
import os

# Windows 11 터미널에서 ANSI 색상 제어 문자를 정상적으로 해석하게 만드는 트리거
os.system('')

# 터미널 텍스트 색상 및 스타일 원리 (ANSI Escape Codes)
RED = '\033[91m'
YELLOW = '\033[93m'
CYAN = '\033[96m'
BLINK = '\033[5m'
BOLD = '\033[1m'
RESET = '\033[0m'

def dramatic_typing(text, speed=0.03, color=RESET):
    """한 글자씩 출력하여 시스템이 실시간으로 반응하는 듯한 쾌감을 주는 함수"""
    for char in text:
        sys.stdout.write(color + char + RESET)
        # 버퍼에 담아두지 않고 즉시 화면에 강제 출력하는 원리
        sys.stdout.flush()
        time.sleep(speed + random.uniform(0, 0.02))
    print()

def simulate_glitch():
    """알 수 없는 헥사코드를 빠르게 쏟아내서 터미널이 폭주하는 연출"""
    for _ in range(15):
        hex_addr = f"0x{random.randint(10000000, 99999999):X}"
        sys.stdout.write(f"{CYAN}[SYS] Loading memory module... {hex_addr} : OK{RESET}\n")
        time.sleep(0.02)

# --- [Scene 1: 정상 작동하는 척 빌드업] ---
dramatic_typing("Initializing Error-Talk v2 Demo Sequence...", 0.05, CYAN)
time.sleep(0.5)
simulate_glitch()
time.sleep(0.5)
dramatic_typing("\n[WARN] Memory leak detected in developer_brain.dll...", 0.05, YELLOW)
time.sleep(0.8)

# --- [Scene 2: 폭발! (화면 1/3을 차지하는 우스꽝스럽고 거대한 에러)] ---
# 아스키 아트는 역슬래시(\) 처리에 주의해야 해서 Raw String(r)과 f-string을 결합함
ascii_art = f"""
{RED}{BOLD}
      .-------------------------------------------------.
     | .---------------------------------------------. |
     | |                                             | |
     | |   {BLINK}>_ CRITICAL CORE MELTDOWN DETECTED <{RESET}{RED}{BOLD}    | |
     | |                                             | |
     | |           \\|||/                             | |
     | |          ( > < )     < WHY DID YOU DO THIS! | |
     | |      --ooO-(_)-Ooo--                        | |
     | |                                             | |
     | '---------------------------------------------' |
     '-------------------------------------------------'
{RESET}
"""
print(ascii_art)
time.sleep(1.5) # 충격을 감상할 1.5초의 정적

# --- [Scene 3: 앱에 복사해 넣을 '진짜 같은' 에러 코드] ---
real_error = f"""
{YELLOW}Traceback (most recent call last):
  File "C:\\Hun_Sunsu_Dream_F\\demo.py", line 42, in <module>
    run_awesome_code()
  File "C:\\Hun_Sunsu_Dream_F\\logic.py", line 99, in run_awesome_code
    raise NullReferenceException("Developer's coffee cup is completely empty.")
NullReferenceException: Object reference not set to an instance of an object.{RESET}
"""
dramatic_typing(real_error, 0.01, YELLOW)
dramatic_typing("\n[시스템 정지] 에러를 복사하여 에러토크 v2에 입력하세요...", 0.05, CYAN)
