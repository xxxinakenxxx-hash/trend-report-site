from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TREND_FILE = ROOT / "client/src/lib/trendData.ts"
ARCHIVE_FILE = ROOT / "client/src/lib/archiveData.ts"

WEEK_ID = "2026-07-w3"
WEEK_LABEL = "2026年7月第3週"
PUBLISHED_AT = "2026-07-15"
ISSUE_NUMBER = "Vol.14"

TRENDS = [
    {
        "id": 1,
        "title": "高加水・超もっちり食感パンの量販化",
        "shortTitle": "高加水もっちりパン",
        "category": "パン・ベーカリー",
        "categoryColor": "#F5A623",
        "icon": "🍞",
        "totalScore": 25,
        "scores": {"話題性": 5, "検索需要": 5, "メディア露出": 5, "業務用接続性": 5, "継続可能性": 5},
        "summary": "ファミリーマートの『超も～っちりパン』シリーズが約3か月で累計2,000万食を突破し、フジパンも加水率約90％の『潤rich』を7月に発売しました。コンビニと量販パンの双方で、しっとり・もっちり食感が商品価値の中心になっています。",
        "background": "高加水製法は水分量を高めることで、やわらかさ、口どけ、引きのある食感を作る設計です。販売実績を伴うシリーズ化と大手製パンメーカーの新規投入が同時に確認できるため、単発商品ではなく量販市場へ定着する兆候と判断しました。",
        "salesAngle": "ベーカリーには、吸水を高めても作業安定性を保ちやすい改良材、湯種・中種、生地になじむクリームやフィリングを組み合わせて提案します。『翌日もしっとり』『冷蔵ケースでも硬くなりにくい』など、売場条件に合わせた食感設計を試作テーマにします。",
        "products": ["高吸水対応製パン改良材", "湯種・中種ベース", "生地なじみのよいクリーム・フィリング"],
        "targets": ["リテイルベーカリー", "量販店向け製パンメーカー", "コンビニベンダー"],
        "talkExample": "『高加水・もっちり食感は、コンビニで2,000万食規模まで広がっています。御社の定番ロールや菓子パンでも、翌日食感まで含めた高加水設計を一緒に試しませんか』",
        "caution": "加水率を上げるだけでは生地だれや成形不良が起こるため、設備、粉、ミキシング、焼成条件を含めた検証が必要です。",
        "sources": [
            {"label": "ファミリーマート（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000002403.000046210.html"},
            {"label": "フジパン", "url": "https://www.fujipan.co.jp/news/053529.html"},
        ],
    },
    {
        "id": 2,
        "title": "バナナスイーツの業態横断展開",
        "shortTitle": "バナナスイーツ横断",
        "category": "スイーツ・洋菓子",
        "categoryColor": "#10B981",
        "icon": "🍌",
        "totalScore": 23,
        "scores": {"話題性": 5, "検索需要": 5, "メディア露出": 5, "業務用接続性": 4, "継続可能性": 4},
        "summary": "7月はサンマルクカフェ、ギンビス、不二家、東京ばな奈×フルグラ、PABLOがバナナ商品を相次いで展開しました。チョコ、キャラメル、チーズ、キャラクターを掛け合わせ、菓子・洋菓子・カフェの複数業態に広がっています。",
        "background": "バナナは認知度が高く、加工適性と他素材との相性に優れます。今週は複数企業の新商品が同時期に集中し、黄色の視認性、濃厚感、親しみやすさを活用した夏休み向け企画が目立ちました。",
        "salesAngle": "ピューレ、プレザーブ、クリーム、フレーバーを、チョコ・キャラメル・チーズのいずれかとセットで提案します。単品ではなく『バナナ×相棒素材』で2～3SKUを作り、ベーカリーとカフェの横断フェアに展開します。",
        "products": ["バナナピューレ・プレザーブ", "耐熱バナナクリーム", "バナナフレーバー"],
        "targets": ["カフェチェーン", "洋菓子店", "ベーカリーチェーン"],
        "talkExample": "『7月はバナナ商品が菓子、カフェ、洋菓子で同時に増えています。チョコ系とキャラメル系の2本立てで、パンとドリンクを横断するフェアにしませんか』",
        "caution": "生果実は褐変と離水が起きやすいため、用途に応じて加工品を選び、香料だけに依存しない味づくりが必要です。",
        "sources": [
            {"label": "えん食べ（ドコモ）", "url": "https://topics.smt.docomo.ne.jp/article/entabe/trend/entabe-60862"},
            {"label": "不二家（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000000453.000097396.html"},
        ],
    },
    {
        "id": 3,
        "title": "冷凍ワンプレートの定着と300万トン市場",
        "shortTitle": "冷凍ワンプレート",
        "category": "冷凍食品・冷凍スイーツ",
        "categoryColor": "#60A5FA",
        "icon": "❄️",
        "totalScore": 22,
        "scores": {"話題性": 4, "検索需要": 5, "メディア露出": 5, "業務用接続性": 5, "継続可能性": 3},
        "summary": "2025年の国内冷凍食品消費量は302万9,325トンとなり、初めて300万トンを超えました。主食とおかずを一体化したワンプレート商品が伸び、個食、時短、簡便調理が市場拡大を支えています。",
        "background": "冷凍食品は保存性だけでなく、献立設計と調理工程をまとめて買える商品へ進化しています。今秋の新商品でもワンプレート、名店監修、素材訴求が増え、家庭用で培われた価値設計は外食・給食の省人化にも応用できます。",
        "salesAngle": "カフェ、給食、外食には、主食・主菜・副菜を一皿で提供できる冷凍素材とソースを組み合わせて提案します。電子レンジやスチームコンベクションで提供時間と歩留まりを数値化し、人手不足対策として示します。",
        "products": ["冷凍米飯・パスタ", "冷凍調理済み主菜", "小分けソース・副菜"],
        "targets": ["カフェチェーン", "給食受託会社", "外食チェーン"],
        "talkExample": "『冷凍食品は年間300万トンを超え、ワンプレートが伸びています。ピーク時の提供時間と廃棄を抑える一皿を、現行設備で検証しませんか』",
        "caution": "市場数量は家庭用・業務用を含む統計です。個別業態の需要へ直接置き換えず、店舗設備と提供品質を検証してください。",
        "sources": [
            {"label": "食品新聞・冷凍食品市場", "url": "https://shokuhin.net/153392/2026/07/13/kakou/reishoku/"},
            {"label": "食品新聞・秋季新商品", "url": "https://shokuhin.net/153424/2026/07/13/kakou/reishoku/"},
        ],
    },
    {
        "id": 4,
        "title": "アルロース採用拡大と低糖質設計",
        "shortTitle": "アルロース採用拡大",
        "category": "健康志向食品",
        "categoryColor": "#34D399",
        "icon": "🥄",
        "totalScore": 21,
        "scores": {"話題性": 3, "検索需要": 4, "メディア露出": 5, "業務用接続性": 5, "継続可能性": 4},
        "summary": "松谷化学工業のアルロース事業は2025年度に前年比160％成長し、飲料を中心に採用が広がっています。砂糖の一部を置き換える設計素材として、菓子・パン・カフェメニューへの応用余地が拡大しています。",
        "background": "消費者の糖質・カロリーへの関心を背景に、甘味料は単なる減糖ではなく、味質、後味、焼き色、物性まで含めて設計する段階に入っています。メーカーの採用実績が増えているため、試作提案の具体性を高めやすい状況です。",
        "salesAngle": "『砂糖ゼロ』を先に掲げず、既存商品の甘味バランスと食感を維持しながら砂糖の一部を置き換える試作から始めます。飲料、ゼリー、焼菓子など用途別に、甘味の立ち上がりと後味を比較します。",
        "products": ["アルロース配合甘味素材", "糖質設計用シロップ", "低糖質向けミックス粉"],
        "targets": ["飲料・カフェチェーン", "洋菓子メーカー", "製パンメーカー"],
        "talkExample": "『アルロースの採用が拡大しています。表示訴求を先行させず、まず現行品の味を崩さない部分置換を3水準で比較しませんか』",
        "caution": "健康効果や身体機能を断定せず、食品表示法、景品表示法、各原料の表示要件を確認したうえで表現を決めます。",
        "sources": [
            {"label": "食品新聞", "url": "https://shokuhin.net/153180/2026/07/09/kakou/satou/"},
        ],
    },
    {
        "id": 5,
        "title": "キャラクターカフェのメニュー×物販一体化",
        "shortTitle": "メニュー×物販",
        "category": "カフェメニュー",
        "categoryColor": "#A78BFA",
        "icon": "⭐",
        "totalScore": 21,
        "scores": {"話題性": 5, "検索需要": 4, "メディア露出": 5, "業務用接続性": 4, "継続可能性": 3},
        "summary": "カービィカフェの夏企画は、限定フード・ドリンクに、持ち帰れる皿、ボウル、マドラー、ボトルを組み合わせています。飲食体験と物販を一体化し、写真映えと客単価向上を同時に設計する手法が明確です。",
        "background": "キャラクターの造形を再現するだけでなく、提供器具や容器を購入可能にすることで、来店後も体験が残る構成です。限定期間とコレクション性が購買理由になり、IPコラボ以外でも地域素材や店舗ロゴへ応用できます。",
        "salesAngle": "メニュー開発時に、食材原価だけでなく器、カップ、ピック、持ち帰り容器まで同時に設計します。限定ドリンク＋再利用ボトル、デザート＋小皿など、セット価格で客単価を上げる企画を提案します。",
        "products": ["成形しやすいデザートベース", "色調安定フルーツソース", "オリジナル容器・ピック"],
        "targets": ["テーマカフェ", "商業施設内カフェ", "観光・レジャー施設"],
        "talkExample": "『限定メニューだけでなく、器や容器を持ち帰れる設計が増えています。デザートと小皿を一体化したセットで、客単価と再来店理由を作りませんか』",
        "caution": "キャラクターやロゴの使用には権利許諾が必要です。物販在庫、洗浄、持ち帰り包装のオペレーションも事前に確認します。",
        "sources": [
            {"label": "SoraNews24", "url": "https://soranews24.com/2026/07/07/kirby-cafe-gets-even-cuter-with-new-summer-menu-and-dishware-you-can-take-homephotos/"},
            {"label": "公式リリース（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000002104.000022901.html"},
        ],
    },
]

EMAIL_SUBJECT = "【営業企画部より】今週の食品・外食トレンドTOP3と提案の切り口（7/15号）"
EMAIL_BODY = """営業部の皆様
お疲れ様です。営業企画部です。

今週は、製菓製パン・外食カフェ向けの業務用提案に接続しやすい公開情報から、次の3件を選定しました。

【今週の注目トレンドTOP3】
■ 1. 高加水・超もっちり食感パンの量販化
ファミリーマートのシリーズが約3か月で累計2,000万食を突破し、フジパンも加水率約90％の商品を投入しました。
提案の切り口：高吸水対応改良材、湯種、生地になじむクリームを組み合わせ、翌日食感まで含めた試作を提案します。

■ 2. バナナスイーツの業態横断展開
7月はカフェ、洋菓子、菓子メーカーでバナナ商品が集中し、チョコ、キャラメル、チーズとの組み合わせが広がっています。
提案の切り口：バナナ単品ではなく、相棒素材を変えた2～3SKUの横断フェアとして提案します。

■ 3. 冷凍ワンプレートの定着と300万トン市場
2025年の国内冷凍食品消費量は302万9,325トンとなり、個食・時短ニーズを捉えたワンプレートが伸びています。
提案の切り口：主食・主菜・副菜を一皿で提供し、ピーク時の提供時間と廃棄削減を数値で示します。

【今週の営業で使える一言】
『今週は、食感・定番果実・省人化の3方向で動きが出ています。御社の既存メニューを変えすぎず、翌日食感、複数SKU、提供時間のどれを改善できるか、一緒に小さく試作しませんか。』

詳細は週次トレンドレポートをご確認ください。
https://trend-report-site.vercel.app/

以上、今週の営業活動にお役立てください。"""


def dumps(value: object, indent: int = 2) -> str:
    return json.dumps(value, ensure_ascii=False, indent=indent)


def trend_ts() -> str:
    return f'''// =============================================================================
// trendData.ts — 最新号ページ データ管理ファイル
// =============================================================================
// 更新対象は下記の実データです。コメント例を正規表現で置換しないでください。
// TREND DATA — {WEEK_LABEL}
// Design: Modern Dashboard × Premium Report
// =============================================================================
export interface TrendScore {{
  話題性: number;
  検索需要: number;
  メディア露出: number;
  業務用接続性: number;
  継続可能性: number;
}}
export interface TrendItem {{
  id: number;
  title: string;
  shortTitle: string;
  category: string;
  categoryColor: string;
  totalScore: number;
  scores: TrendScore;
  summary: string;
  background: string;
  salesAngle: string;
  products: string[];
  targets: string[];
  talkExample: string;
  caution: string;
  sources: {{ label: string; url: string }}[];
  icon: string;
}}
export const trends: TrendItem[] = {dumps(TRENDS)};
export const emailContent = {dumps({"subject": EMAIL_SUBJECT, "body": EMAIL_BODY})};
export const reportMeta = {dumps({"weekLabel": WEEK_LABEL, "issueNumber": ISSUE_NUMBER, "publishedAt": PUBLISHED_AT, "nextPublishDate": "2026-07-22"})};
export const weeklySalesTip = '今週は、食感・定番果実・省人化の3方向で動きが出ています。御社の既存メニューを変えすぎず、翌日食感、複数SKU、提供時間のどれを改善できるか、一緒に小さく試作しませんか。';
export const scoreLabels: (keyof TrendScore)[] = [
  '話題性',
  '検索需要',
  'メディア露出',
  '業務用接続性',
  '継続可能性',
];
'''


def archive_issue() -> dict:
    return {
        "id": WEEK_ID,
        "issueNumber": ISSUE_NUMBER,
        "weekLabel": WEEK_LABEL,
        "publishedAt": PUBLISHED_AT,
        "isLatest": True,
        "keywordTags": ["高加水パン", "バナナ", "冷凍ワンプレート", "アルロース", "体験型カフェ"],
        "editorNote": "今週は、食感価値を量販化した高加水パン、複数業態へ広がるバナナ、個食・省人化を支える冷凍ワンプレートが上位です。素材単品ではなく、工程・売場・客単価まで含めた提案に接続します。",
        "topTrends": [{**{key: value for key, value in item.items() if key != "id"}, "rank": item["id"]} for item in TRENDS],
    }


def find_object_end(text: str, start: int) -> int:
    depth = 0
    in_string = False
    escape = False
    for pos in range(start, len(text)):
        ch = text[pos]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_string = False
            continue
        if ch == '"':
            in_string = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return pos + 1
    raise ValueError("archiveIssues先頭オブジェクトの終端を検出できません")


def update_archive(text: str) -> str:
    marker = "export const archiveIssues: ArchiveIssue[] = ["
    marker_pos = text.index(marker)
    array_pos = marker_pos + len(marker)
    first_start = text.index("{", array_pos)
    first_end = find_object_end(text, first_start)
    first_obj = json.loads(text[first_start:first_end])

    new_json = dumps(archive_issue())
    if first_obj.get("id") == WEEK_ID:
        # 同一週のプレースホルダーがある場合は重複追加せず、そのレコードだけを置換する。
        return text[:first_start] + new_json + text[first_end:]

    # 通常週は既存最新号をfalseにして新号を配列先頭へ追加する。
    old_json = dumps({**first_obj, "isLatest": False})
    return text[:first_start] + new_json + ",\n  " + old_json + text[first_end:]


original_archive = ARCHIVE_FILE.read_text(encoding="utf-8")
TREND_FILE.write_text(trend_ts(), encoding="utf-8")
ARCHIVE_FILE.write_text(update_archive(original_archive), encoding="utf-8")
print(json.dumps({"trend_file": str(TREND_FILE), "archive_file": str(ARCHIVE_FILE), "week_id": WEEK_ID, "published_at": PUBLISHED_AT, "top1": TRENDS[0]["title"]}, ensure_ascii=False, indent=2))
