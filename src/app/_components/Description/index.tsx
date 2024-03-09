export default function Description() {
    return (
        <div className="flex justify-between p-20">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold underline">ネタバレ画像の定義</h1>
                <p className="text-xl">「試合最終結果の予想がつく画像」</p>
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold underline">ラベル付与の方法</h1>
                <p className="text-xl">3つのネタバレ度合いから1つを選択</p>
            </div>
            <div className="space-y-2">
                <h1 className="text-2xl font-bold underline">対象スポーツ</h1>
                <p className="text-xl">野球・サッカー・バスケ・アメフト（各2000枚）</p>
            </div>
        </div>
    )
}