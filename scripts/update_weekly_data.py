from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
TREND_FILE = ROOT / "client/src/lib/trendData.ts"
ARCHIVE_FILE = ROOT / "client/src/lib/archiveData.ts"

WEEK_ID = "2026-07-w4"
WEEK_LABEL = "2026年7月第4週"
PUBLISHED_AT = "2026-07-22"
ISSUE_NUMBER = "Vol.15"
NEXT_PUBLISH_DATE = "2026-07-29"

TRENDS: list[dict[str, Any]] = [
    {
        "id": 1,
        "title": "ミルクスイーツのカテゴリー横断フェア",
        "shortTitle": "ミルクスイーツ横断",
        "category": "スイーツ・洋菓子",
        "categoryColor": "#10B981",
        "icon": "🥛",
        "totalScore": 24,
        "scores": {"話題性": 5, "検索需要": 5, "メディア露出": 5, "業務用接続性": 5, "継続可能性": 4},
        "summary": "ファミリーマートは、パン、シュー、クレープ、クイニーアマン、アイスなど7品を束ねた「ほっぺたとろける！ミルクスイーツ」を7月21日から全国約16,400店で展開しました。アプリの値引きクーポンも組み合わせ、単品ではなく売場全体でミルクの濃厚感と食感を訴求しています。",
        "background": "商品群は菓子パン、洋生菓子、冷菓を横断し、ミルククリーム、ホイップ、ホワイトチョコレート、食感の異なる生地を共通のテーマでつないでいます。発売前後に公式、ニュース、食品系媒体での掲載が確認でき、夏場でもミルクのコクと軽い口どけを両立させる設計が注目されています。",
        "salesAngle": "ベーカリー・カフェには、北海道産などの産地訴求が可能な乳原料、ミルククリーム、ホイップ、ホワイトチョコレート、口どけを補う油脂を一括で提案します。パン・焼菓子・冷菓・ドリンクの2〜4SKUを同一テーマで設計し、フェア化と発注集約を両立させます。",
        "products": ["乳風味クリーム・ホイップ", "ホワイトチョコレート・ミルクソース", "菓子パン・冷菓向け食感改良素材"],
        "targets": ["ベーカリーチェーン", "カフェチェーン", "コンビニベンダー"],
        "talkExample": "「今週は、パンからアイスまで『ミルク』で売場をつなぐ企画が全国展開されています。御社でもミルククリームを共通軸に、パン・デザート・ドリンクを3品でそろえるフェアを試しませんか。」",
        "caution": "乳アレルゲン表示、乳原料価格、夏場の品質保持を確認してください。コンビニのアプリ値引き施策をそのまま他業態へ転用せず、各社の販促条件に合わせて設計します。",
        "sources": [
            {"label": "ファミリーマート公式ニュースリリース", "url": "https://www.family.co.jp/company/news_releases/2026/20260717_02.html"},
            {"label": "ORICON NEWS", "url": "https://www.oricon.co.jp/news/2468438/full/"},
        ],
    },
    {
        "id": 2,
        "title": "ドバイチョコ風の多層食感スイーツ",
        "shortTitle": "ドバイチョコ風食感",
        "category": "スイーツ・洋菓子",
        "categoryColor": "#10B981",
        "icon": "🍫",
        "totalScore": 23,
        "scores": {"話題性": 5, "検索需要": 5, "メディア露出": 5, "業務用接続性": 4, "継続可能性": 4},
        "summary": "ローソンは7月21日、ピスタチオペーストとカダイフをチョコ掛けしたもちもち生地で挟む「ドバイチョコ風サンド」を発売しました。別事業者でもチョコレート、ピスタチオ、カダイフ、餅を重ねる商品が確認され、素材名だけでなくザクザク・もちもちの食感設計が価値の中心です。",
        "background": "ピスタチオの濃厚感、カダイフの軽い歯切れ、チョコレートのコーティング、もち系生地を組み合わせた多層構造です。公式発表と食品メディアで同時に露出しており、海外由来の菓子イメージを国内で食べやすい形に変換する動きが確認できます。",
        "salesAngle": "洋菓子店・カフェには、ピスタチオペースト、カダイフ、耐熱・コーティング用チョコレート、もち感を出すミックス粉をセットで提案します。断面の見え方と食感の順番を試食で比較し、単価を上げる限定デザートとして検証します。",
        "products": ["ピスタチオペースト", "カダイフ・食感トッピング", "コーティングチョコレート・もち系ミックス粉"],
        "targets": ["洋菓子専門店", "カフェチェーン", "コンビニ向けデザートベンダー"],
        "talkExample": "「ピスタチオだけでなく、カダイフのザクザク感ともち生地の対比までが商品価値です。断面が見える限定デザートとして、3素材の組み合わせを試作しませんか。」",
        "caution": "ピスタチオ・小麦などのアレルゲン表示、カダイフの吸湿、原料価格と調達安定性を事前に確認してください。SNS上の反応だけを需要の根拠にはしません。",
        "sources": [
            {"label": "ローソン公式ニュースリリース", "url": "https://www.lawson.co.jp/company/news/detail/1530064_2504.html"},
            {"label": "とろり天使のわらびもち（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000000075.000143487.html"},
        ],
    },
    {
        "id": 3,
        "title": "食制約に配慮した冷凍ベーカリー・デザート",
        "shortTitle": "食制約対応冷凍",
        "category": "健康志向食品",
        "categoryColor": "#34D399",
        "icon": "🌱",
        "totalScore": 22,
        "scores": {"話題性": 4, "検索需要": 4, "メディア露出": 4, "業務用接続性": 5, "継続可能性": 5},
        "summary": "テーブルマークは業務用のBEYOND FREEから、卵・乳原材料を使わない食物繊維入りの「おやさいパン」と、原材料に小麦・乳・卵を使わない豆乳クリームカップケーキを8月1日から全国発売予定と発表しました。給食・外食の食制約対応と調理負担軽減に接続しやすい冷凍ベーカリー・デザートの具体例です。",
        "background": "同社の業務用冷凍食品では、焼成冷凍パン、デザート、プラントベース商品を同時に拡充しています。食物アレルギー等に配慮するメニューは、食べる人の選択肢だけでなく、現場の製造・保管・提供を標準化しやすい点でも提案価値があります。",
        "salesAngle": "給食・カフェ・ホテルには、冷凍パン、個食デザート、アレルゲン情報、再加熱・解凍手順を一式で提案します。通常メニューとの見た目・食感の差を小さくし、共通メニューと個別対応の双方で使える構成を試作します。",
        "products": ["アレルゲン配慮型冷凍パン", "植物由来クリーム・冷凍デザート", "個食包装・表示支援資材"],
        "targets": ["給食受託会社", "ホテル・宴会場", "カフェチェーン"],
        "talkExample": "「食制約への配慮は、特別メニューを増やすだけではなく、冷凍個食化で現場の提供工程を整える提案になります。通常メニューと並べても遜色のないパンとデザートを検証しませんか。」",
        "caution": "原材料不使用と製造工場でのアレルゲン管理は別の論点です。製造ライン、コンタミネーション、表示、各施設の運用ルールを確認し、健康・医療効果は断定しません。",
        "sources": [
            {"label": "BEYOND FREE業務用新商品（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000000129.000075782.html"},
            {"label": "テーブルマーク業務用冷凍食品新商品（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000000133.000075782.html"},
        ],
    },
    {
        "id": 4,
        "title": "カカオブランドの夏季ベーカリー提案",
        "shortTitle": "夏季カカオベーカリー",
        "category": "パン・ベーカリー",
        "categoryColor": "#F5A623",
        "icon": "🥐",
        "totalScore": 21,
        "scores": {"話題性": 4, "検索需要": 4, "メディア露出": 4, "業務用接続性": 5, "継続可能性": 4},
        "summary": "GODIVA Bakery ゴディパンは、レモンのサマーシュトーレン、カカオフルーツレモンのコロネ、カカオ生地のサンド、塩パンなど、夏季限定商品と新商品5品を7月15日から順次投入しました。カカオを冬の濃厚菓子に限定せず、柑橘、塩味、軽食と掛け合わせています。",
        "background": "季節限定の柑橘系菓子パンに加え、サーモン＆タルタルやベーコン＆エッグの軽食でもカカオ生地を活用しています。高付加価値のチョコレート素材を、甘味・塩味・食事用途へ横断展開する構成は、ベーカリーの客単価と品ぞろえを同時に考える材料になります。",
        "salesAngle": "ベーカリーには、カカオ、チョコレート、柑橘ピール・ソース、塩味フィリングを組み合わせ、甘味系と軽食系を同じ生地で展開する提案を行います。限定商品の前に、既存コロネや塩パンを使った小規模テストで売れ筋と製造負荷を確認します。",
        "products": ["カカオ・チョコレート素材", "柑橘ピール・レモンソース", "塩味フィリング・サンドイッチ具材"],
        "targets": ["高付加価値ベーカリー", "百貨店内ベーカリー", "カフェ併設ベーカリー"],
        "talkExample": "「夏でもカカオを重く見せず、レモンや塩味を合わせてパンと軽食に広げる事例が出ています。既存の塩パンかコロネを使い、甘味と軽食の2品を試作しませんか。」",
        "caution": "本事例は5店舗展開の限定ブランドです。市場全体の需要と断定せず、地域・価格帯・製造設備に合わせてテスト販売で確認してください。",
        "sources": [
            {"label": "GODIVA Bakery ゴディパン（PR TIMES）", "url": "https://prtimes.jp/main/html/rd/p/000000927.000015355.html"},
            {"label": "GODIVA Bakery ゴディパン公式サイト", "url": "https://www.godiva.co.jp/godipan/"},
        ],
    },
    {
        "id": 5,
        "title": "カフェチェーンの夏季フルーツ×クリーム・フローズン",
        "shortTitle": "夏果実カフェドリンク",
        "category": "カフェメニュー",
        "categoryColor": "#A78BFA",
        "icon": "🍑",
        "totalScore": 21,
        "scores": {"話題性": 4, "検索需要": 5, "メディア露出": 4, "業務用接続性": 4, "継続可能性": 4},
        "summary": "7月のカフェチェーンでは、コメダ珈琲店、スターバックス、ドトール、エクセルシオール、サンマルクカフェ、上島珈琲店の6ブランドが、桃、マスカット、ライチ、レモン、ココナッツなどを使う新作を投入しました。果実感にクリーム、茶、炭酸、フローズンの食感を重ねる構成が共通しています。",
        "background": "ピーチクリーミーティーラテ、チーズ系フローズン、果肉・ゼリーのトッピング、フルーツソーダなど、単に果汁を加えるのではなく、層・トッピング・提供温度で価値を作る商品が並びます。複数チェーンの同時投入が確認できるため、夏のカフェメニューで果実と乳素材を組み合わせる需要は比較的強いと評価しました。",
        "salesAngle": "カフェには、果実ピューレ・ソース、乳・植物由来のクリーム、茶ベース、ゼリー・果肉トッピングを組み合わせ、アイス・フローズン・炭酸の3形式に展開します。ドリンクだけでなく、同じ果実ソースを使ったパフェや焼菓子も併売し、原料を共通化します。",
        "products": ["果実ピューレ・プレザーブ", "ホイップ・チーズ系クリーム", "ゼリー・果肉・炭酸用シロップ"],
        "targets": ["カフェチェーン", "レストランのデザート部門", "商業施設内カフェ"],
        "talkExample": "「この夏は、果実を単品で使うより、クリーム、茶、炭酸、ゼリーで飲み進める変化を作るメニューが増えています。1つの桃またはマスカットソースから、ドリンクとデザートを同時に作りませんか。」",
        "caution": "果実原料の供給量・価格・色調安定性を確認してください。カフェチェーンの新商品は期間限定が多く、導入は既存設備とオペレーションに合わせた簡素な設計を優先します。",
        "sources": [
            {"label": "えん食べ・2026年7月カフェチェーンドリンクまとめ", "url": "https://topics.smt.docomo.ne.jp/article/entabe/trend/entabe-60874"},
            {"label": "macaroni・カフェチェーンの桃メニュー", "url": "https://macaro-ni.jp/177035"},
        ],
    },
]

EMAIL_SUBJECT = "【営業企画部より】今週の食品・外食トレンドTOP3と提案の切り口（7/22号）"
EMAIL_BODY = """営業部の皆様
お疲れ様です。営業企画部です。

今週は、製菓製パン・外食カフェ向けの業務用提案に接続しやすい公開情報から、次の3件を選定しました。

【今週の注目トレンドTOP3】
■ 1. ミルクスイーツのカテゴリー横断フェア
ファミリーマートがパン・洋生菓子・アイスを含む7品を全国展開し、アプリ販促も連動させています。
提案の切り口：ミルククリーム、ホイップ、ホワイトチョコレートを共通軸に、パン・デザート・ドリンクを3品でそろえます。

■ 2. ドバイチョコ風の多層食感スイーツ
ピスタチオ、カダイフ、チョコレート、もち系生地を重ね、素材名に加えて食感の対比を価値にしています。
提案の切り口：ピスタチオペースト、カダイフ、コーティングチョコをセットで提案し、断面の見え方まで含めて試作します。

■ 3. 食制約に配慮した冷凍ベーカリー・デザート
業務用の植物由来冷凍パン・カップケーキが発売予定で、給食・外食の個別対応と作業標準化に接続できます。
提案の切り口：冷凍個食、アレルゲン情報、再加熱・解凍手順を一式で提示し、通常メニューと並べた提供を検証します。

【今週の営業で使える一言】
「今週は、ミルクの横断フェア、断面と食感の高付加価値化、食制約対応の冷凍個食が動いています。御社の定番商品を大きく変えず、共通原料で2〜3品を作る小規模な試作から始めませんか。」

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
export const reportMeta = {dumps({"weekLabel": WEEK_LABEL, "issueNumber": ISSUE_NUMBER, "publishedAt": PUBLISHED_AT, "nextPublishDate": NEXT_PUBLISH_DATE})};
export const weeklySalesTip = '今週は、ミルクの横断フェア、断面と食感の高付加価値化、食制約対応の冷凍個食が動いています。御社の定番商品を大きく変えず、共通原料で2〜3品を作る小規模な試作から始めませんか。';
export const scoreLabels: (keyof TrendScore)[] = [
  '話題性',
  '検索需要',
  'メディア露出',
  '業務用接続性',
  '継続可能性',
];
'''


def archive_issue() -> dict[str, Any]:
    return {
        "id": WEEK_ID,
        "issueNumber": ISSUE_NUMBER,
        "weekLabel": WEEK_LABEL,
        "publishedAt": PUBLISHED_AT,
        "isLatest": True,
        "keywordTags": ["ミルクスイーツ", "ドバイチョコ風", "食制約対応", "夏季ベーカリー", "果実カフェ"],
        "editorNote": "今週は、ミルクを軸にしたカテゴリー横断フェア、ピスタチオとカダイフによる多層食感、食制約に配慮する冷凍個食が上位です。素材だけでなく、共通原料による横展開、提供工程、売場での見せ方まで含めて営業提案へ接続します。",
        "topTrends": [{**{key: value for key, value in item.items() if key != "id"}, "rank": item["id"]} for item in TRENDS],
    }


def find_object_end(text: str, start: int) -> int:
    """文字列・エスケープを考慮して、先頭オブジェクトの終端を構造的に検出する。"""
    depth = 0
    in_string = False
    escape = False
    for pos in range(start, len(text)):
        ch = text[pos]
        if in_string:
            if escape:
                escape = False
            elif ch == "\\\\":
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
    """コメントではなくexport配列の先頭実オブジェクトだけを構造的に更新する。"""
    marker = "export const archiveIssues: ArchiveIssue[] = ["
    marker_pos = text.index(marker)
    array_pos = marker_pos + len(marker)
    first_start = text.index("{", array_pos)
    first_end = find_object_end(text, first_start)
    first_obj = json.loads(text[first_start:first_end])

    new_json = dumps(archive_issue())
    if first_obj.get("id") == WEEK_ID:
        return text[:first_start] + new_json + text[first_end:]

    old_json = dumps({**first_obj, "isLatest": False})
    return text[:first_start] + new_json + ",\n  " + old_json + text[first_end:]


def main() -> None:
    original_archive = ARCHIVE_FILE.read_text(encoding="utf-8")
    generated_trend = trend_ts()
    updated_archive = update_archive(original_archive)

    # 置換対象をコメントまで広げないこと、および最新号フラグの整合性を検証する。
    assert "コメント例を正規表現で置換しないでください。" in generated_trend
    assert '"id": "2026-07-w4"' in updated_archive
    assert '"id": "2026-07-w3"' in updated_archive
    new_index = updated_archive.index('"id": "2026-07-w4"')
    previous_index = updated_archive.index('"id": "2026-07-w3"')
    assert new_index < previous_index
    previous_fragment = updated_archive[previous_index:previous_index + 500]
    assert '"isLatest": false' in previous_fragment

    TREND_FILE.write_text(generated_trend, encoding="utf-8")
    ARCHIVE_FILE.write_text(updated_archive, encoding="utf-8")
    print(json.dumps({
        "trend_file": str(TREND_FILE),
        "archive_file": str(ARCHIVE_FILE),
        "week_id": WEEK_ID,
        "published_at": PUBLISHED_AT,
        "top1": TRENDS[0]["title"],
        "previous_issue_set_false": True,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
