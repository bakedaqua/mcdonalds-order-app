-- 1. 建立 orders 資料表
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    item_name TEXT NOT NULL,
    item_price NUMERIC NOT NULL,
    item_options TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 允許匿名讀寫 (因為我們目前不用嚴格的登入系統，直接讓前端可存取)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 建立允許所有人 SELECT, INSERT, DELETE 的政策 (Policy)
CREATE POLICY "Enable read access for all users"
    ON public.orders FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for all users"
    ON public.orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable delete for all users"
    ON public.orders FOR DELETE
    USING (true);

-- 3. 開啟這張表的 Realtime 功能
-- 注意：Supabase 現在預設只有新表需要額外加到 supabase_realtime 的 publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
