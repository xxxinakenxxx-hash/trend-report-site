#!/usr/bin/env python3
from __future__ import annotations
import json
import re
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path('/home/ubuntu/trend-report-site')
OUT = Path('/home/ubuntu/trend_research')
LOGDIR = OUT / 'logs'
OUT.mkdir(parents=True, exist_ok=True)
LOGDIR.mkdir(parents=True, exist_ok=True)

week_id = '2026-06-w1'
week_label = '2026年6月第1週'
published_at = '2026-06-03'
issue_number = 'Vol.10'

candidates = [
    {
        'rank': 1,
        'title': '塩バターパン進化系（ハムチーズ・チョコ・メロンパン）',
        'shortTitle': '塩バター進化パン',
        'category': 'パン・ベーカリー',
        'categoryColor': '#F5A623',
        'scores': {'話題性': 5, '検索需要': 5, 'メディア露出': 5, '業務用接続性': 5, '継続可能性': 5},
        'summary': 'ファミリーマートが2026年6月2日から「うまじゅわ～っ！塩バターパン」3品を全国発売しました。定番化した塩バターパンに、ハムチーズ、チョコ、メロンパンを掛け合わせ、初夏の塩気需要に合わせた提案軸が明確です。',
        'background': 'ファミリーマート公式ニュースリリースでは、気温上昇期に塩気を求める需要が高まることを背景に、発酵バター入り塩マーガリン、ロレーヌ岩塩、デニッシュやビスケット生地を組み合わせた3品を2026年6月2日から全国発売すると確認できます。塩バターパンはベーカリーで定着済みのため、既存商品に塩味と油脂の香りを重ねるだけで売場提案へ接続しやすいテーマです。甘味系と惣菜系の両方に展開でき、製菓製パン向け営業で最も扱いやすい今週の主題です。',
        'salesAngle': '発酵バター入りマーガリン、塩味フィリング、チョコチップ、ハムチーズ、デニッシュ生地、ビス生地を組み合わせて、既存の菓子パン・惣菜パンを初夏限定品に転換してください。塩味を前面に出すことで、甘いパンだけでは取り切れない朝食・軽食需要にも提案できます。',
        'products': ['発酵バター入りマーガリン', 'ロレーヌ岩塩・塩味フィリング', 'デニッシュ生地・冷凍パン生地', 'チョコチップ・チョコクリーム', 'ハム・チーズクリーム'],
        'targets': ['ベーカリーチェーン', 'コンビニ向けパンメーカー', '量販店インストアベーカリー', 'カフェ併設ベーカリー'],
        'talkExample': '『今週はファミリーマートが塩バターパンをハムチーズ、チョコ、メロンパンに広げています。既存の菓子パンに塩バターを足すだけで、初夏向けの“甘じょっぱい”新商品として提案できます。』',
        'caution': '塩分、油脂量、バター表示は原料規格に基づいて確認してください。発酵バターを訴求する場合は、配合量と表示可能範囲を必ず確認する必要があります。',
        'sources': [
            {'label': 'ファミリーマート公式 — うまじゅわ～っ！塩バターパン3種類 6月2日発売', 'url': 'https://www.family.co.jp/company/news_releases/2026/20260529_010.html'},
            {'label': 'マイナビニュース — ファミリーマート新作パン・スイーツ関連記事', 'url': 'https://news.mynavi.jp/article/20260601-4529195/'}
        ],
        'icon': '🥐',
        'evidence_date': '2026-05-29 / 2026-06-02',
        'business_fit': '既存パンへの塩味・油脂・具材追加で即提案可能'
    },
    {
        'rank': 2,
        'title': '初夏メロン冷感ドリンク・果肉ゼリースイーツ',
        'shortTitle': '初夏メロン冷感',
        'category': 'カフェメニュー',
        'categoryColor': '#A78BFA',
        'scores': {'話題性': 5, '検索需要': 5, 'メディア露出': 5, '業務用接続性': 5, '継続可能性': 4},
        'summary': 'リンツが6月1日から赤肉メロンとホワイトチョコレートを組み合わせたフローズンドリンクを発売し、コンビニ各社でもメロン系スイーツが継続しています。果肉、ゼリー、フローズンを組み合わせた初夏の高単価ドリンク提案に使えます。',
        'background': 'リンツ公式リリースでは、赤肉メロン、ホワイトチョコレート、メロンゼリー、フローズンクインシーメロンを使う「メロン フローズン ショコラドリンク」を2026年6月1日から7月31日まで販売すると確認できます。えん食べの6月コンビニ新作スイーツ特集でも、クインシーメロン杏仁豆腐などメロンを使った初夏スイーツが確認できます。メロンは季節感と高単価感を両立しやすく、カフェ・外食向けに横展開しやすい素材です。',
        'salesAngle': '赤肉メロンソース、メロン果肉、メロンゼリー、フラッペベース、ホワイトチョコソースを組み合わせ、ドリンク・パフェ・杏仁デザートに横展開してください。果肉感を出す仕様と、オペレーションを軽くするソース中心仕様を分けて提案できます。',
        'products': ['赤肉メロンソース', 'メロン果肉・メロンピューレ', 'メロンゼリー', 'フラッペベース', 'ホワイトチョコソース'],
        'targets': ['カフェチェーン', 'チョコレート・洋菓子専門店', 'ファミリーレストラン', 'ホテル・レジャー施設'],
        'talkExample': '『メロンはコンビニスイーツとカフェドリンクの両方で動いています。メロンソースとゼリーを共通化すれば、ドリンク、パフェ、杏仁を同じ初夏フェアで組めます。』',
        'caution': '産地名、品種名、果汁・果肉量は実配合と一致させてください。メロン風味のみの場合は、品種や果肉感の表現を過度に強めないほうが安全です。',
        'sources': [
            {'label': 'PR TIMES — リンツ メロン フローズン ショコラドリンク', 'url': 'https://prtimes.jp/main/html/rd/p/000000144.000069940.html'},
            {'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}
        ],
        'icon': '🍈',
        'evidence_date': '2026-05-25 / 2026-06-01',
        'business_fit': 'ドリンク・パフェ・冷菓への共通素材提案が可能'
    },
    {
        'rank': 3,
        'title': 'レモン×発酵バター／はちみつレモンパン',
        'shortTitle': 'レモン発酵バター',
        'category': 'スイーツ・洋菓子',
        'categoryColor': '#10B981',
        'scores': {'話題性': 5, '検索需要': 4, 'メディア露出': 5, '業務用接続性': 5, '継続可能性': 4},
        'summary': 'バターバトラーが6月1日から発酵バターと瀬戸内産レモンピールを使ったバターレモンケーキを発売し、ペンギンベーカリーも6月8日からはちみつレモンフランスを展開します。焼菓子とベーカリーを横断する初夏の酸味提案です。',
        'background': 'バターバトラーのリリースでは、発酵バター、瀬戸内産レモンピール、アーモンドパウダー、グラサージュを使った「バターレモンケーキ」を6月1日から期間限定で発売すると確認できます。ペンギンベーカリーの夏限定パンでは、爽やかなレモンカスタードとはちみつを合わせた「はちみつレモンフランス」が6月8日から販売されます。酸味、冷やして食べる提案、手土産需要を組み合わせられるため、洋菓子とベーカリーの双方で使えるテーマです。',
        'salesAngle': 'レモンピール、レモンカスタード、発酵バター、はちみつ、グラサージュ、フランスパン生地を組み合わせてください。夏場の重いバター菓子を、レモンの酸味で軽く見せる設計が有効です。',
        'products': ['瀬戸内レモンピール', 'レモンカスタード', '発酵バター', 'はちみつ', 'グラサージュ・アイシング'],
        'targets': ['洋菓子店', 'ベーカリーチェーン', '駅ナカ・空港土産店', 'カフェ併設菓子売場'],
        'talkExample': '『発酵バターのコクにレモンの酸味を合わせる商品が増えています。夏場でも重く見えない焼菓子・菓子パンとして、レモンピールやレモンカスタードを提案できます。』',
        'caution': '瀬戸内産などの産地表示は原料由来と配合比率を確認してください。酸味を強める場合は乳成分との分離や生地の焼成安定性も確認が必要です。',
        'sources': [
            {'label': 'PR TIMES — バターバトラー バターレモンケーキ', 'url': 'https://prtimes.jp/main/html/rd/p/000001590.000016051.html'},
            {'label': 'NEWSCAST — ペンギンベーカリー夏限定新作パン', 'url': 'https://newscast.jp/smart/news/7443232'}
        ],
        'icon': '🍋',
        'evidence_date': '2026-05-26 / 2026-06-01',
        'business_fit': '焼菓子・パンの両方へレモン素材を展開可能'
    },
    {
        'rank': 4,
        'title': '200kcal以下・軽量コンビニスイーツ',
        'shortTitle': '軽量スイーツ',
        'category': '健康志向食品',
        'categoryColor': '#34D399',
        'scores': {'話題性': 4, '検索需要': 5, 'メディア露出': 5, '業務用接続性': 4, '継続可能性': 5},
        'summary': 'セブン-イレブンの6月2日以降の新作から、100kcal以下のコーヒーゼリーや200kcal以下のチーズケーキ、抹茶プリンなどが紹介されています。健康効果ではなく、食べ切りや軽さを訴求するスイーツ提案に向きます。',
        'background': 'えん食べでは、2026年6月2日以降発売のセブン-イレブン新商品のうち、200kcal以下のスイーツとして、とろけるコーヒーゼリー、あんこと八女抹茶のもっちりプリン、和もっち巻き よもぎ、牛乳を味わうふわとろミルクチーズケーキが掲載されています。カロリーを気にする消費者向けの記事ですが、健康効果を示すものではありません。業務用では小容量、ゼリー、和素材、ミルク系の軽い口当たりに分解して提案するのが適切です。',
        'salesAngle': 'コーヒーゼリー、抹茶プリンベース、粒あん、よもぎ生地、軽量チーズケーキベースを使い、食後や夜向けの小容量スイーツとして提案してください。機能性ではなく「軽い食べ切りサイズ」「冷蔵ケースで手に取りやすい価格帯」を訴求軸にします。',
        'products': ['コーヒーゼリー', '抹茶プリンベース', '粒あん・よもぎ生地', 'ミルクチーズケーキベース', '小容量カップ資材'],
        'targets': ['コンビニ向けデザートメーカー', '量販店チルドデザート部門', 'カフェの食後デザート', '社員食堂・病院売店の売場'],
        'talkExample': '『低カロリーを健康効果として言うのではなく、軽く食べ切れる冷蔵スイーツとして提案すると安全です。ゼリーや抹茶プリンなら、夏場の食後デザートにも使いやすいです。』',
        'caution': '健康効果、ダイエット効果、医療効果は断定しないでください。カロリー表示はレシピ・規格書・検査値に基づく必要があります。',
        'sources': [
            {'label': 'えん食べ — セブン-イレブン 200kcal以下スイーツ 6月2日以降', 'url': 'https://entabe.jp/amp/60459/seven-eleven-200kcal-sweets-20260602'},
            {'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}
        ],
        'icon': '🍮',
        'evidence_date': '2026-06-02',
        'business_fit': '小容量・軽さ訴求でチルドデザート提案に接続'
    },
    {
        'rank': 5,
        'title': '冷やしクリームパン・ふわもち冷感スイーツパン',
        'shortTitle': '冷感クリームパン',
        'category': 'パン・ベーカリー',
        'categoryColor': '#F5A623',
        'scores': {'話題性': 4, '検索需要': 4, 'メディア露出': 5, '業務用接続性': 5, '継続可能性': 4},
        'summary': 'ローソンの「ふわもち冷やしクリームパン ダブルカスタード」が6月2日発売の新作として掲載されています。冷蔵パン、カスタード、ふわもち食感を組み合わせた、ベーカリーとチルドデザートの中間提案です。',
        'background': 'えん食べの2026年6月コンビニ新作スイーツ特集では、ローソンの「クリームたっぷり！ふわもち冷やしクリームパン ダブルカスタード」が6月2日発売商品として紹介されています。トクバイニュースのローソン新作スイーツまとめでも、冷やしクリームパンやもち食感ロールなど、冷蔵・ふわもち・クリーム量を軸にした商品群が整理されています。暑い時期のパン売場では、焼成香よりも冷感とクリームの満足感が差別化軸になります。',
        'salesAngle': '冷蔵対応パン生地、カスタードホイップ、カスタードクリーム、保形性の高いクリーム、冷蔵包材を組み合わせて、夏向けの冷やして食べるパンとして提案してください。ベーカリーの午後需要、コンビニのデザート棚、カフェのテイクアウトに接続できます。',
        'products': ['冷蔵対応パン生地', 'カスタードホイップ', 'カスタードクリーム', '保形性クリーム', '冷蔵用個包装資材'],
        'targets': ['コンビニ向けパンメーカー', 'ベーカリーチェーン', 'カフェチェーン', '量販店チルドパン売場'],
        'talkExample': '『暑くなる時期は、焼き立て訴求だけでなく、冷やして食べるパンの提案が有効です。カスタードを二層にすると、既存クリームパンでもデザート感を出せます。』',
        'caution': '冷蔵販売ではパン生地の硬化、クリームの離水、消費期限内の食感劣化を確認してください。常温パンと同じ配合のまま冷蔵化しないほうが安全です。',
        'sources': [
            {'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'},
            {'label': 'トクバイニュース — ローソン新作スイーツ情報まとめ', 'url': 'https://tokubai.co.jp/news/articles/4200'}
        ],
        'icon': '🥯',
        'evidence_date': '2026-06-01 / 2026-06-02',
        'business_fit': '冷蔵パン・チルドデザート棚の双方へ提案可能'
    },
    {
        'rank': 6,
        'title': 'チョコミント・ひんやりスイーツパン',
        'shortTitle': 'チョコミントパン',
        'category': 'パン・ベーカリー',
        'categoryColor': '#F5A623',
        'scores': {'話題性': 4, '検索需要': 4, 'メディア露出': 4, '業務用接続性': 4, '継続可能性': 3},
        'summary': 'ペンギンベーカリーが6月8日からチョコミントパンを夏限定で発売します。夏季のチョコミント需要をベーカリーに持ち込む動きとして注目できます。',
        'background': 'NEWSCASTの記事では、ペンギンベーカリーの夏限定新作として、チョコミントクリームとチョコチップを使う「チョコミントパン」が掲載されています。SNS上でもチョコミントは季節話題化しやすい素材ですが、今回は公開記事で確認できるベーカリー商品を根拠に扱います。',
        'salesAngle': 'ミントクリーム、チョコチップ、白パン生地、冷蔵販売資材を組み合わせ、夏限定のスイーツパンとして提案してください。',
        'products': ['ミントクリーム', 'チョコチップ', '白パン生地', '冷蔵対応包材'],
        'targets': ['ベーカリーチェーン', 'カフェベーカリー', '催事パン売場'],
        'talkExample': '『チョコミントは好き嫌いが分かれるため、期間限定・少量展開にするとリスクを抑えられます。』',
        'caution': 'ミント香料の強さは購買層で許容差が大きいため、試食評価を前提にしてください。',
        'sources': [{'label': 'NEWSCAST — ペンギンベーカリー夏限定新作パン', 'url': 'https://newscast.jp/smart/news/7443232'}],
        'icon': '🌿', 'evidence_date': '2026-06-01', 'business_fit': '季節限定パンとして限定提案向き'
    },
    {
        'rank': 7,
        'title': '抹茶×もち食感の和洋折衷スイーツ',
        'shortTitle': '抹茶もち食感',
        'category': '和菓子・和スイーツ',
        'categoryColor': '#F472B6',
        'scores': {'話題性': 4, '検索需要': 4, 'メディア露出': 5, '業務用接続性': 4, '継続可能性': 4},
        'summary': 'コンビニ新作で西尾抹茶ラテ、宇治抹茶ロール、森半コラボのもち食感ロールなどが継続して確認できます。',
        'background': 'えん食べとトクバイニュースの複数記事で、抹茶、わらび餅、もち食感ロール、抹茶プリンが確認できます。',
        'salesAngle': '抹茶クリーム、わらび餅、求肥、粒あんを組み合わせ、冷蔵和洋菓子へ提案します。',
        'products': ['抹茶パウダー', '抹茶クリーム', '求肥', 'わらび餅', '粒あん'],
        'targets': ['和洋菓子メーカー', 'コンビニ向けデザートメーカー', 'カフェ'],
        'talkExample': '『抹茶単体ではなく、もち・あん・ミルクを組み合わせると新商品感が出ます。』',
        'caution': '抹茶の産地・銘柄表示は規格確認が必要です。',
        'sources': [{'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}, {'label': 'トクバイニュース — ローソン新作スイーツ情報まとめ', 'url': 'https://tokubai.co.jp/news/articles/4200'}],
        'icon': '🍵', 'evidence_date': '2026-05-26 / 2026-06-01', 'business_fit': '和洋素材の組み合わせで提案可能'
    },
    {
        'rank': 8,
        'title': 'カスタード二層・厚切りクリームサンド',
        'shortTitle': '厚切りクリーム',
        'category': 'スイーツ・洋菓子',
        'categoryColor': '#10B981',
        'scores': {'話題性': 3, '検索需要': 4, 'メディア露出': 4, '業務用接続性': 5, '継続可能性': 4},
        'summary': 'ローソンのダブルカスタード冷やしクリームパン、ファミリーマートの厚切りケーキサンドなど、クリーム量感を訴求する商品が確認できます。',
        'background': 'えん食べの6月コンビニ新作特集で、ダブルカスタード、厚切りケーキサンドが確認できます。',
        'salesAngle': 'クリーム量を断面で見せる設計により、低コストでも満足感を打ち出せます。',
        'products': ['カスタードクリーム', 'ホイップクリーム', 'スポンジシート', '冷蔵包材'],
        'targets': ['洋生菓子メーカー', 'ベーカリー', '量販店デザート売場'],
        'talkExample': '『クリームを二層にすると、既存商品でも断面の説明力が上がります。』',
        'caution': 'クリーム量増加は原価・温度管理・消費期限に影響します。',
        'sources': [{'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}],
        'icon': '🍰', 'evidence_date': '2026-06-01', 'business_fit': '断面訴求の商品開発へ接続'
    },
    {
        'rank': 9,
        'title': 'タコスロール・スパイス惣菜パン',
        'shortTitle': 'スパイス惣菜パン',
        'category': 'パン・ベーカリー',
        'categoryColor': '#F5A623',
        'scores': {'話題性': 3, '検索需要': 3, 'メディア露出': 4, '業務用接続性': 5, '継続可能性': 4},
        'summary': 'ペンギンベーカリーの夏限定商品にタコスロールが入り、暑い季節のスパイス惣菜パン需要に接続できます。',
        'background': 'NEWSCAST記事では、スパイス香る肉の旨み、キャベツ、トマトを合わせたタコスロールが紹介されています。',
        'salesAngle': 'タコミート、スパイスソース、チーズ、トマト系フィリングを提案します。',
        'products': ['タコミート', 'サルサソース', 'チーズ', '惣菜パン生地'],
        'targets': ['ベーカリー', 'カフェ', '量販店惣菜パン売場'],
        'talkExample': '『夏場は甘いパンだけでなく、スパイス系の昼食パンも提案できます。』',
        'caution': '辛味表示とアレルゲンを確認してください。',
        'sources': [{'label': 'NEWSCAST — ペンギンベーカリー夏限定新作パン', 'url': 'https://newscast.jp/smart/news/7443232'}],
        'icon': '🌮', 'evidence_date': '2026-06-01', 'business_fit': '惣菜パン・昼食需要へ接続'
    },
    {
        'rank': 10,
        'title': 'ストロベリーレアチーズ・酸味クレープ',
        'shortTitle': '苺レアチーズ',
        'category': 'スイーツ・洋菓子',
        'categoryColor': '#10B981',
        'scores': {'話題性': 3, '検索需要': 4, 'メディア露出': 4, '業務用接続性': 4, '継続可能性': 4},
        'summary': 'ファミリーマート新作としてストロベリーレアチーズクレープが掲載され、酸味系チーズスイーツが継続しています。',
        'background': 'えん食べの6月コンビニ新作特集で、ストロベリーソースとレアチーズムースを合わせたクレープが確認できます。',
        'salesAngle': '苺ソース、レアチーズムース、もちもちクレープ生地を提案します。',
        'products': ['苺ソース', 'レアチーズムース', 'クレープ生地', 'ホイップ'],
        'targets': ['洋生菓子メーカー', 'カフェ', 'クレープ専門店'],
        'talkExample': '『苺は春で終わらせず、レアチーズの酸味と合わせると初夏にも使えます。』',
        'caution': '果肉感・チーズ含有量の表現は規格に合わせてください。',
        'sources': [{'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}],
        'icon': '🍓', 'evidence_date': '2026-06-01', 'business_fit': '既存クレープ・ムースの季節提案に接続'
    },
    {
        'rank': 11,
        'title': 'コーヒーゼリー再提案',
        'shortTitle': 'コーヒーゼリー',
        'category': 'カフェメニュー',
        'categoryColor': '#A78BFA',
        'scores': {'話題性': 3, '検索需要': 4, 'メディア露出': 4, '業務用接続性': 4, '継続可能性': 5},
        'summary': 'セブン-イレブンの100kcal以下スイーツとしてコーヒーゼリーが掲載され、夏場の定番冷菓として再提案できます。',
        'background': 'えん食べでは6月4日以降発売の「とろけるコーヒーゼリー」が掲載されています。',
        'salesAngle': 'コーヒーゼリー、クリーム、クラッシュゼリーを、カフェドリンクやパフェに転用します。',
        'products': ['コーヒーゼリー', 'クリーム', 'カップ資材', 'コーヒー抽出液'],
        'targets': ['カフェ', 'チルドデザートメーカー', '外食チェーン'],
        'talkExample': '『コーヒーゼリーは低単価でも夏場の冷感デザートとして回転させやすいです。』',
        'caution': 'カロリー表示は規格書に基づいてください。',
        'sources': [{'label': 'えん食べ — セブン-イレブン 200kcal以下スイーツ', 'url': 'https://entabe.jp/amp/60459/seven-eleven-200kcal-sweets-20260602'}],
        'icon': '☕', 'evidence_date': '2026-06-02', 'business_fit': '冷菓・カフェメニューへ接続'
    },
    {
        'rank': 12,
        'title': '塩豆大福・和素材の冷蔵展開',
        'shortTitle': '塩豆大福',
        'category': '和菓子・和スイーツ',
        'categoryColor': '#F472B6',
        'scores': {'話題性': 3, '検索需要': 3, 'メディア露出': 4, '業務用接続性': 4, '継続可能性': 5},
        'summary': 'ローソン新作として塩豆大福が掲載され、塩味と小豆を使った和菓子の定番提案が継続しています。',
        'background': 'えん食べの6月コンビニ新作特集で、北海道産小豆と赤えんどうを使う塩豆大福が確認できます。',
        'salesAngle': '粒あん、赤えんどう、塩味、もち生地を提案し、夏場の甘じょっぱい和菓子に接続します。',
        'products': ['粒あん', '赤えんどう', 'もち生地', '塩味素材'],
        'targets': ['和菓子メーカー', '量販店和菓子売場', 'カフェ'],
        'talkExample': '『甘じょっぱい和菓子は、冷茶やカフェドリンクとのセット提案に使えます。』',
        'caution': '産地表示とアレルゲン、日持ちを確認してください。',
        'sources': [{'label': 'えん食べ — 2026年6月コンビニ新作スイーツ特集', 'url': 'https://entabe.jp/60489/seven-eleven-familymart-lawson-new-sweets-june-2026'}],
        'icon': '🍡', 'evidence_date': '2026-06-01', 'business_fit': '和菓子売場・カフェセット提案へ接続'
    },
]

for c in candidates:
    c['totalScore'] = sum(c['scores'].values())

top_trends = candidates[:5]

md_lines = []
md_lines.append(f'# {week_label} 食品・製菓製パン・外食カフェ向けトレンド候補スコアリング')
md_lines.append('')
md_lines.append(f'発行日：{published_at}')
md_lines.append('')
md_lines.append('公開Web情報に限定し、直近1か月以内、とくに2026年5月下旬から6月上旬の新商品・媒体記事を優先しました。健康効果・医療効果は根拠対象外とし、営業提案への接続性を重視して評価しています。')
md_lines.append('')
md_lines.append('| 順位 | 候補テーマ | 領域 | 話題性 | 検索需要・消費者関心 | メディア露出 | 業務用提案への接続性 | 継続可能性 | 合計 | 根拠URL | 営業接続メモ |')
md_lines.append('|---:|---|---|---:|---:|---:|---:|---:|---:|---|---|')
for c in candidates:
    srcs = '<br>'.join([f"[{s['label']}]({s['url']})" for s in c['sources']])
    md_lines.append(f"| {c['rank']} | **{c['title']}** | {c['category']} | {c['scores']['話題性']} | {c['scores']['検索需要']} | {c['scores']['メディア露出']} | {c['scores']['業務用接続性']} | {c['scores']['継続可能性']} | **{c['totalScore']}** | {srcs} | {c['business_fit']} |")
md_lines.append('')
md_lines.append('## TOP5選定理由')
md_lines.append('')
for c in top_trends:
    md_lines.append(f"### {c['rank']}. {c['title']}")
    md_lines.append(c['summary'])
    md_lines.append('')

score_path = OUT / f'{week_id}_scoring.md'
score_path.write_text('\n'.join(md_lines) + '\n', encoding='utf-8')

log = {
    'weekId': week_id,
    'weekLabel': week_label,
    'publishedAt': published_at,
    'createdAt': datetime.now(timezone.utc).isoformat(),
    'role': '製菓製パン・外食カフェ向け業務用卸の営業企画担当',
    'researchScope': {
        'publicWebOnly': True,
        'priorityPeriod': '直近1か月以内、主に2026年5月下旬〜2026年6月上旬',
        'targetAreas': ['パン・ベーカリー', 'スイーツ・洋菓子', 'カフェメニュー', '冷凍食品・冷凍スイーツ', '健康志向・高付加価値食品'],
        'excluded': ['根拠がSNSのみの断定', '古い情報の今週トレンド化', '健康効果・医療効果の断定']
    },
    'searchQueries': [
        '2026年6月 コンビニ 新作 スイーツ パン',
        '2026年6月 カフェ 新商品 メロン レモン',
        '2026年6月 ベーカリー 新作 塩バター レモン チョコミント',
        'June 2026 Japan sweets bakery cafe new product'
    ],
    'scoringAxes': ['話題性', '検索需要・消費者関心', 'メディア露出', '業務用提案への接続性', '継続可能性'],
    'candidates': candidates,
    'selectedTop5': [c['title'] for c in top_trends],
    'scoringMarkdownPath': str(score_path),
    'notes': [
        '冷凍食品・冷凍スイーツは今週の上位根拠が相対的に弱く、メロンフローズンや冷蔵・冷感提案を優先した。',
        '健康志向は200kcal以下という商品情報に限定し、健康効果・ダイエット効果は断定していない。',
        '複数媒体で確認できるテーマを上位に置き、単一媒体のテーマは順位を下げた。'
    ]
}
log_path = LOGDIR / f'{week_id}_research_log.json'
log_path.write_text(json.dumps(log, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

# TypeScript更新用データ
trend_items = []
for c in top_trends:
    trend_items.append({
        'id': c['rank'],
        'title': c['title'],
        'shortTitle': c['shortTitle'],
        'category': c['category'],
        'categoryColor': c['categoryColor'],
        'totalScore': c['totalScore'],
        'scores': c['scores'],
        'summary': c['summary'],
        'background': c['background'],
        'salesAngle': c['salesAngle'],
        'products': c['products'],
        'targets': c['targets'],
        'talkExample': c['talkExample'],
        'caution': c['caution'],
        'sources': c['sources'],
        'icon': c['icon'],
    })

email_content = {
    'subject': '【営業企画部より】今週の食品・外食トレンドTOP3と提案の切り口（6/3号）',
    'body': '営業部の皆様\n\nお疲れ様です。営業企画部です。\n今週の食品・スイーツ市場の最新トレンド情報をお届けします。\n6月第1週は、塩バター、メロン冷感、レモン酸味、軽量スイーツ、冷やしクリームパンが同時に動いています。公開Web情報で確認でき、かつ製菓製パン・外食カフェ向けの業務用提案へ接続しやすい5件を選定しました。\n\n【今週の注目トレンドTOP3】\n\n■ 1. 塩バターパン進化系（ハムチーズ・チョコ・メロンパン）\nファミリーマートが6月2日から、塩バターパンをハムチーズ、チョコ、メロンパンに広げた新商品を全国発売しています。初夏の塩気需要と、甘じょっぱい菓子パン・惣菜パンの両方に接続できます。\n▶ 提案のヒント：発酵バター入りマーガリン、塩味フィリング、チョコチップ、ハムチーズを既存パンに重ね、初夏限定の塩バター企画として提案してください。\n\n■ 2. 初夏メロン冷感ドリンク・果肉ゼリースイーツ\nリンツのメロン フローズン ショコラドリンク、コンビニのメロン系スイーツなど、メロンを使った冷感メニューが継続しています。果肉、ゼリー、フローズンを組み合わせると、高単価のカフェメニューにしやすいテーマです。\n▶ 提案のヒント：赤肉メロンソース、メロン果肉、メロンゼリー、フラッペベースを共通化し、ドリンク、パフェ、杏仁デザートへ横展開してください。\n\n■ 3. レモン×発酵バター／はちみつレモンパン\nバターバトラーのバターレモンケーキ、ペンギンベーカリーのはちみつレモンフランスなど、レモンの酸味を焼菓子・パンに合わせる動きが確認できます。夏場でも重く見えないバター菓子・菓子パンの提案に向きます。\n▶ 提案のヒント：レモンピール、レモンカスタード、発酵バター、はちみつ、グラサージュを組み合わせ、冷やして食べる焼菓子や爽やかな菓子パンとして提案してください。\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n今週の営業で使える一言\n『今週は、塩バターでパンに初夏の塩気を足し、メロンとレモンで冷感・爽やかさを作る提案が使えます。既存の菓子パン、フラッペ、焼菓子に、塩味・果肉・ゼリー・レモンカスタードを足すだけで、6月向けの限定メニューに切り替えられます。』\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n詳細な背景や具体的なトーク例、関連素材のリストは社内ポータルのレポートをご確認ください。\n今週もよろしくお願いいたします。\n\n営業企画部'
}

def js_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def to_ts(obj, indent=0):
    sp = ' ' * indent
    if isinstance(obj, dict):
        parts = ['{']
        for k, v in obj.items():
            key = json.dumps(k, ensure_ascii=False) if not re.match(r'^[A-Za-z_$][\w$]*$', k) else k
            parts.append(' ' * (indent + 2) + f'{key}: {to_ts(v, indent + 2)},')
        parts.append(sp + '}')
        return '\n'.join(parts)
    if isinstance(obj, list):
        if not obj:
            return '[]'
        parts = ['[']
        for v in obj:
            parts.append(' ' * (indent + 2) + to_ts(v, indent + 2) + ',')
        parts.append(sp + ']')
        return '\n'.join(parts)
    if isinstance(obj, str):
        return js_string(obj)
    if isinstance(obj, bool):
        return 'true' if obj else 'false'
    if obj is None:
        return 'null'
    return str(obj)

def find_matching(text: str, start: int, open_char: str, close_char: str) -> int:
    depth = 0
    in_str = None
    escape = False
    for i in range(start, len(text)):
        ch = text[i]
        if in_str:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == in_str:
                in_str = None
            continue
        if ch in ('"', "'", '`'):
            in_str = ch
            continue
        if ch == open_char:
            depth += 1
        elif ch == close_char:
            depth -= 1
            if depth == 0:
                return i
    raise ValueError('matching bracket not found')

trend_path = ROOT / 'client/src/lib/trendData.ts'
trend_text = trend_path.read_text(encoding='utf-8')
trend_text = re.sub(r'^// TREND DATA — .*$', f'// TREND DATA — {week_label}（← 毎週ここを更新してください）', trend_text, count=1, flags=re.MULTILINE)
marker = 'export const trends: TrendItem[] = '
start = trend_text.index(marker) + len(marker)
end = find_matching(trend_text, start, '[', ']') + 1
trend_text = trend_text[:start] + to_ts(trend_items, 0) + trend_text[end:]
marker2 = 'export const emailContent = '
start2 = trend_text.index(marker2) + len(marker2)
end2 = find_matching(trend_text, start2, '{', '}') + 1
trend_text = trend_text[:start2] + to_ts(email_content, 0) + trend_text[end2:]
trend_path.write_text(trend_text, encoding='utf-8')

archive_issue = {
    'id': week_id,
    'issueNumber': issue_number,
    'weekLabel': week_label,
    'publishedAt': published_at,
    'isLatest': True,
    'editorNote': '6月第1週は、塩バターパン進化系、メロン冷感ドリンク、レモン×発酵バター、200kcal以下の軽量スイーツ、冷やしクリームパンを上位に選定しました。初夏の塩気、冷感、酸味、軽さを、既存のパン・ドリンク・焼菓子へ足し込む提案が営業上使いやすい週です。',
    'keywordTags': ['塩バター', 'メロン', 'レモン', '軽量スイーツ', '冷やしクリームパン', '発酵バター'],
    'topTrends': [{k: v for k, v in item.items() if k != 'id'} | {'rank': item['id']} for item in trend_items]
}
archive_path = ROOT / 'client/src/lib/archiveData.ts'
archive_text = archive_path.read_text(encoding='utf-8')
arr_marker = 'export const archiveIssues: ArchiveIssue[] = ['
pos = archive_text.index(arr_marker) + len(arr_marker)
rest = archive_text[pos:]
rest = rest.replace('"isLatest": true,', '"isLatest": false,', 1)
insert = f"\n  // ── {issue_number} — {week_label} ──\n  " + to_ts(archive_issue, 2).replace('\n', '\n  ') + ',\n'
archive_path.write_text(archive_text[:pos] + insert + rest, encoding='utf-8')

print(json.dumps({'score_path': str(score_path), 'log_path': str(log_path), 'trend_path': str(trend_path), 'archive_path': str(archive_path), 'candidate_count': len(candidates), 'top1': top_trends[0]['title']}, ensure_ascii=False, indent=2))
