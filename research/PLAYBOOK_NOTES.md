# プレイブック運用ノート

このファイルは、週次トレンド調査の運用改善事項を記録するものです。

---

## 2026-07-14 記録：検索クエリ設計の改善方針

### 問題の認識

Vol.11〜Vol.14の調査ログを集計した結果、情報収集先が `prtimes.jp`（PR TIMES）と `entabe.jp`（えん食べ）の2媒体に全体の約32%が集中していることが判明した。

根本原因は「検索クエリの設計」にある。「2026年7月 コンビニ スイーツ 新発売」のような新商品まとめ型のクエリを使うと、検索エンジンの上位に常にこの2媒体が表示されるため、毎号同じ情報源に着地してしまっている。

PR TIMES とえん食べしかトレンド情報はないのかという問題意識が正しい。これらは「発表された情報」を集めるには有効だが、「なぜ今これが売れているか」「消費者がどう反応しているか」という視点の情報は含まれない。

### 改善方針（次号以降に適用）

**検索クエリの設計を「媒体ありき」から「テーマ・素材・現象ありき」に変える。**

#### 変更前（偏りの原因）

```
「2026年7月 コンビニ スイーツ 新発売」
「2026年7月 パン ベーカリー 新商品 トレンド」
```

→ 検索上位に常に同じまとめ系メディアが来るため、情報源が固定される。

#### 変更後（次号から適用）

同一テーマを以下の複数の「切り口」で検索し、異なる媒体・視点から情報を収集する。

| 切り口 | クエリ例 | 期待される情報源 |
|---|---|---|
| 素材・テーマ軸 | 「桃 スイーツ 2026夏 人気」「アールグレイ パン 話題」 | レシピ系・グルメ系メディア |
| 消費者反応軸 | 「桃 スイーツ 食べた 感想 2026」「話題 行列 カフェ 7月」 | 食べログ・SNS・ブログ |
| 業界・B2B軸 | 「夏スイーツ 業務用 素材 トレンド 2026」 | 食品産業新聞・製菓製パン誌 |
| 外食チェーン軸 | 「スシロー 新メニュー 7月 2026」「ドトール 夏 新商品」 | 各チェーン公式・専門メディア |
| 検索トレンド軸 | Googleトレンドで「急上昇」している食品ワードを確認 | Google Trends |
| SNS公開投稿軸 | X（旧Twitter）の公開投稿でハッシュタグ検索 | X公式アカウント・一般投稿 |
| メーカー公式軸 | 各社プレスリリースページを直接確認（meiji.co.jp等） | メーカー公式サイト |

#### 収集先の多様性チェック基準（次号から）

- 同一ドメインが source_catalog 全体の20%を超えないことを目安とする
- PR TIMES とえん食べの合計が全体の30%以下になるよう意識する
- 「コンビニ新商品まとめ」「プレスリリース」「専門誌・B2B」「消費者視点」の4カテゴリから最低各2件以上収集する

---

## 2026-06-24 記録 / 2026-07-29 改訂：Vercel BLOCKED問題の根本対策

### 問題

GitHub の noreply メールアドレスが `2.70020554e+08+...`（指数表記）になるとVercelがデプロイをBLOCKする。2026-06-24 に初発し、2026-07-29 に再発した。

### 根本原因（2026-07-29 特定）

問題の所在は **`~/.gitconfig`（グローバル設定）** にある。

```
# ~/.gitconfig の [user] セクション（誤った状態）
[user]
    email = 2.70020554e+08+xxxinakenxxx-hash@users.noreply.github.com
```

サンドボックスのセッションが切り替わるたびに `~/.gitconfig` が指数表記に戻る。ローカルリポジトリの `.git/config` で上書きしても、**新しいクローン・新しいセッションでは常にグローバル設定が優先される**ため、毎回再発する。

### 根本対策（2026-07-29 適用済み）

**グローバル設定を直接修正する。** ローカルリポジトリへの個別設定では再発を防げない。

```bash
# グローバル設定を正しい形式に修正（セッション開始時に1回実行）
git config --global user.email "270020554+xxxinakenxxx-hash@users.noreply.github.com"

# 修正後の確認
cat ~/.gitconfig | grep email
# → email = 270020554+xxxinakenxxx-hash@users.noreply.github.com
```

### プレイブックへの組み込み（次号以降の手順に追加）

コミット前の必須チェックとして、以下をプレイブックの「GitHubへのpush」ステップの**直前**に挿入する。

```bash
# ステップ: コミット前のメールアドレス検証（毎回必須）
EMAIL=$(git config --global user.email)
if [[ "$EMAIL" == *"e+08"* ]]; then
  echo "[ERROR] メールアドレスが指数表記です。修正します。"
  git config --global user.email "270020554+xxxinakenxxx-hash@users.noreply.github.com"
fi
git config --global user.email  # 正しい形式であることを目視確認
```

### コミット済みの場合のリカバリー手順

```bash
# 1. グローバル設定を修正
git config --global user.email "270020554+xxxinakenxxx-hash@users.noreply.github.com"

# 2. 最新コミットのauthorを修正（空コミットの場合は --allow-empty を追加）
git commit --amend --reset-author --no-edit

# 3. 空コミットが途中にある場合は interactive rebase で一括修正
git rebase -i <前号のコミットハッシュ> --exec "git commit --amend --reset-author --no-edit"
# → 空コミットでエラーが出た場合は git rebase --skip で続行

# 4. force push
git push origin main --force

# 5. Vercelのデプロイが自動トリガーされるまで3〜5分待機
# 確認方法: curl -sI https://trend-report-site.vercel.app/ | grep last-modified
# → 今日の日付になっていればデプロイ完了
```

### Vercelデプロイ状態の確認方法

Vercelダッシュボードへのログインがなくても、以下のcurlコマンドで確認できる。

```bash
# デプロイ完了の確認（last-modifiedが今日の日付 かつ x-vercel-cache: MISS であればOK）
curl -sI "https://trend-report-site.vercel.app/" | grep -E "last-modified|x-vercel-cache"

# JSバンドルに今週号のデータが含まれているか確認
JS_URL=$(curl -s "https://trend-report-site.vercel.app/" | grep -o 'src="[^"]*\.js"' | head -1 | sed 's/src="//;s/"//')
curl -s "https://trend-report-site.vercel.app$JS_URL" | grep -oP '第[0-9]+週' | head -3
```

---

## 2026-07-14 記録：クレジット消費安定化のための設計方針

### 問題の認識

毎回の自動処理でクレジット消費が安定しない原因は、「チェックや確認を増やすこと」ではなく、**失敗が発生してリカバリー処理が積み重なること**にある。チェックを増やすこと自体がクレジットを消費するため、解決策は「失敗しない設計にする」ことに絞る。

### 対策1：trendData.ts / archiveData.ts の書き換えは `file write` 一発書き込みに統一する

スクリプトを作成 → 実行 → 失敗 → 修正 → 再実行という往復がクレジット浪費の最大原因。ファイルの現在の構造を読んだうえで、`file write` ツールでファイル全体を直接書き込む1ステップに集約する。正規表現マッチに依存するスクリプト方式は使わない。

### 対策2：調査ログJSONはPythonのdictを `json.dumps()` で生成する

文字列として手書きすると引用符・特殊文字のエスケープミスが起きる。PythonのdictオブジェクトをそのままJSON出力すれば構文エラーは原理的に発生しない。

```python
import json

log = {
    "period": {"id": "2026-07-w3", ...},
    "candidates": {...},
    ...
}

with open('xxx_research_log.json', 'w', encoding='utf-8') as f:
    json.dump(log, f, ensure_ascii=False, indent=2)
```
