import { useMemo, useState } from "react";
import { BookOpen, Search, Heart, History, House, LibraryBig, BrainCircuit, Menu, X, ChevronRight, Moon, Sun, PanelLeft, Sparkles, ClipboardCheck } from "lucide-react";
import { demoBooks } from "./data/demoBooks";
import type { Book } from "./types";

type Page = "home" | "library" | "detail" | "reader" | "shelf" | "history" | "quiz" | "admin";
const nav = [
  { id: "home", label: "Trang chủ", icon: House },
  { id: "library", label: "Kho sách", icon: LibraryBig },
  { id: "shelf", label: "Tủ sách của tôi", icon: Heart },
  { id: "history", label: "Lịch sử đọc", icon: History },
  { id: "quiz", label: "Kiểm tra sau đọc", icon: ClipboardCheck }
] as const;

function App() {
  const [page, setPage] = useState<Page>("home");
  const [selected, setSelected] = useState<Book>(demoBooks[0]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [favorites, setFavorites] = useState<string[]>(["demo-2"]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [fontSize, setFontSize] = useState(19);
  const [pageNo, setPageNo] = useState(48);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = ["Tất cả", ...Array.from(new Set(demoBooks.map(b => b.category)))];
  const filtered = useMemo(() => demoBooks.filter(b =>
    (category === "Tất cả" || b.category === category) &&
    `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);
  const openBook = (book: Book) => { setSelected(book); setPage("detail"); setMobileMenu(false); };
  const toggleFavorite = (id: string) => setFavorites(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const go = (p: Page) => { setPage(p); setMobileMenu(false); };

  return <div className={`app-shell ${dark && page === "reader" ? "reader-dark" : ""}`}>
    <header className="topbar">
      <button className="icon-btn mobile-only" aria-label="Mở menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <button className="brand" onClick={() => go("home")}>
        <span className="brand-mark"><BookOpen size={23}/></span>
        <span><b>VIỆT ÂU</b><small>DIGITAL LIBRARY</small></span>
      </button>
      <div className="top-search"><Search size={17}/><input value={query} onChange={e => {setQuery(e.target.value); setPage("library");}} placeholder="Tìm tên sách, tác giả..." /></div>
      <div className="top-actions">
        <span className="demo-label">BẢN KHỞI TẠO</span>
        <button className="avatar" title="Tài khoản">S</button>
      </div>
    </header>

    <div className="app-layout">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="sidebar-label">KHÔNG GIAN ĐỌC</div>
        {nav.map(item => <button key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => go(item.id as Page)}><item.icon size={18}/>{item.label}</button>)}
        <div className="sidebar-divider"/>
        <div className="sidebar-label">QUẢN TRỊ</div>
        <button className={`nav-item ${page === "admin" ? "active" : ""}`} onClick={() => go("admin")}><PanelLeft size={18}/>Quản lý thư viện</button>
        <div className="sidebar-note"><Sparkles size={17}/><b>Mỗi trang sách</b><span>mở ra một chân trời mới.</span></div>
      </aside>
      {mobileMenu && <button className="scrim" aria-label="Đóng menu" onClick={() => setMobileMenu(false)}/>}
      <main className="main-content">
        {page === "home" && <Home onOpen={openBook} onBrowse={() => go("library")} />}
        {page === "library" && <section>
          <PageHeading eyebrow="KHÁM PHÁ TRI THỨC" title="Kho sách Việt Âu" desc="Tìm kiếm và khám phá những cuốn sách dành cho bạn."/>
          <div className="filter-row">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`chip ${category === c ? "selected" : ""}`}>{c}</button>)}</div>
          <div className="book-grid">{filtered.map(b => <BookCard key={b.id} book={b} onClick={() => openBook(b)} favorite={favorites.includes(b.id)} onFavorite={() => toggleFavorite(b.id)}/>)}</div>
          {filtered.length === 0 && <div className="empty-state">Không tìm thấy sách phù hợp.</div>}
        </section>}
        {page === "detail" && <section>
          <button className="back-link" onClick={() => go("library")}>← Quay lại kho sách</button>
          <div className="detail-layout">
            <div className="cover-placeholder large-cover"><BookOpen size={56}/><span>{selected.title}</span></div>
            <div className="detail-copy"><span className="eyebrow">{selected.category.toUpperCase()}</span><h1>{selected.title}</h1><p className="muted">{selected.author}</p><div className="meta-pills"><span>{selected.format}</span><span>{selected.pages} trang</span><span>Học liệu Việt Âu</span></div><p>{selected.description}</p>
              <div className="detail-actions"><button className="primary-btn" onClick={() => go("reader")}><BookOpen size={17}/> Đọc ngay</button><button className="secondary-btn" onClick={() => toggleFavorite(selected.id)}><Heart size={17} fill={favorites.includes(selected.id) ? "currentColor" : "none"}/>{favorites.includes(selected.id) ? "Đã yêu thích" : "Yêu thích"}</button></div>
              {selected.allowDownload && <p className="muted tiny"><Download size={14}/> Sách được cấu hình cho phép tải xuống (demo).</p>}
            </div>
          </div>
          <div className="info-panel"><b>Gợi ý học tập</b><p>Đọc sách và hoàn thành bài kiểm tra ngắn để ghi nhận kết quả đọc.</p><button className="secondary-btn" onClick={() => go("quiz")}>Làm bài kiểm tra <ChevronRight size={16}/></button></div>
        </section>}
        {page === "reader" && <section className="reader-section">
          <div className="reader-toolbar"><button className="back-link" onClick={() => go("detail")}>← Thông tin sách</button><span className="reader-book-title">{selected.title}</span><div className="toolbar-actions"><button className="icon-btn" onClick={() => setFontSize(Math.max(14,fontSize-1))}>A−</button><button className="icon-btn" onClick={() => setFontSize(Math.min(28,fontSize+1))}>A+</button><button className="icon-btn" onClick={() => setDark(!dark)}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button></div></div>
          <div className="reader-paper"><div className="reader-page-content"><div className="chapter-label">CHƯƠNG XXI · CÁO</div><h2>{selected.title}</h2><p>Và Hoàng tử bé quay lại gặp con cáo.</p><p>– Xin chào – cậu nói.</p><p>– Xin chào – con cáo đáp lại.</p><p>– Bạn là ai? – Hoàng tử bé hỏi. – Bạn đẹp quá...</p><p>– Tôi là một con cáo – con cáo nói.</p><blockquote>“Người ta chỉ nhìn thấy rõ bằng trái tim. Điều cốt yếu thì mắt thường không nhìn thấy được.”</blockquote><p>Nội dung hiển thị ở đây là văn bản minh họa. Bản thật sẽ lấy nội dung từ file EPUB hoặc PDF đã được nhà trường tải lên.</p></div></div>
          <div className="reader-progress"><span>Trang {pageNo} / {selected.pages}</span><input type="range" min="1" max={selected.pages} value={pageNo} onChange={e => setPageNo(Number(e.target.value))}/><div className="reader-page-actions"><button className="secondary-btn" onClick={() => setPageNo(Math.max(1,pageNo-1))}>Trang trước</button><button className="primary-btn" onClick={() => setPageNo(Math.min(selected.pages,pageNo+1))}>Trang tiếp <ChevronRight size={16}/></button></div></div>
        </section>}
        {page === "shelf" && <section><PageHeading eyebrow="CÁ NHÂN" title="Tủ sách của tôi" desc="Những cuốn sách bạn đang lưu và theo dõi."/><h3>Sách yêu thích</h3><div className="book-grid">{demoBooks.filter(b => favorites.includes(b.id)).map(b => <BookCard key={b.id} book={b} onClick={() => openBook(b)} favorite onFavorite={() => toggleFavorite(b.id)}/>)}</div><h3 className="section-subtitle">Đang đọc</h3><BookCard book={demoBooks[0]} onClick={() => {setSelected(demoBooks[0]);go("reader");}} favorite={false} onFavorite={() => {}}/></section>}
        {page === "history" && <section><PageHeading eyebrow="HOẠT ĐỘNG CỦA BẠN" title="Lịch sử đọc" desc="Tiếp tục từ nơi bạn đã dừng lại."/><div className="history-list">{demoBooks.slice(0,3).map((b,i)=><button className="history-row" key={b.id} onClick={() => openBook(b)}><div className="mini-cover"><BookOpen/></div><span><b>{b.title}</b><small>{i===0 ? "Hôm nay · Trang 48" : "Đã đọc gần đây"}</small></span><ChevronRight size={18}/></button>)}</div></section>}
        {page === "quiz" && <section><PageHeading eyebrow="HỌC TẬP THÔNG MINH" title="Kiểm tra sau khi đọc" desc="Bài kiểm tra minh họa gắn với cuốn Hoàng tử bé."/><div className="quiz-card"><span className="eyebrow">CÂU HỎI 01 / 01</span><h2>Theo câu chuyện, điều gì làm nên một tình bạn?</h2>{["Chỉ cần gặp nhau một lần","Thời gian, sự quan tâm và trách nhiệm","Có nhiều điểm chung","Không cần dành thời gian"].map((a,i)=><label className={`answer-option ${answer===String(i)?"chosen":""}`} key={a}><input type="radio" name="answer" value={i} checked={answer===String(i)} onChange={() => {setAnswer(String(i));setSubmitted(false);}}/>{a}</label>)}<button className="primary-btn" disabled={!answer} onClick={() => setSubmitted(true)}>Nộp bài</button>{submitted && <div className="success-note">{answer==="1" ? "Chính xác! Bạn đã nắm được ý chính." : "Chưa chính xác. Hãy thử đọc lại nội dung và làm lại."}</div>}</div></section>}
        {page === "admin" && <section><PageHeading eyebrow="KHU VỰC QUẢN TRỊ" title="Quản lý thư viện" desc="Bảng điều khiển mẫu dành cho thủ thư và quản trị viên."/><div className="stats-grid"><Stat label="Tổng đầu sách" value="—" note="Chưa kết nối dữ liệu"/><Stat label="Độc giả" value="—" note="Chưa nhập tài khoản"/><Stat label="Lượt đọc" value="—" note="Chưa ghi nhận thực tế"/><Stat label="Dung lượng R2" value="—" note="Chưa kết nối Cloudflare"/></div><div className="info-panel"><b>Giai đoạn tiếp theo</b><p>Kết nối D1/R2, đăng nhập, tải file sách và quản lý danh mục.</p></div></section>}
      </main>
    </div>
    <footer className="footer">VIỆT ÂU DIGITAL LIBRARY <span>READ · EXPLORE · GROW</span></footer>
  </div>;
}

function PageHeading({eyebrow,title,desc}:{eyebrow:string;title:string;desc:string}) {
  return <div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div>;
}
function Home({onOpen,onBrowse}:{onOpen:(b:Book)=>void;onBrowse:()=>void}) {
  return <section><div className="hero"><div><span className="eyebrow light">CHÀO MỪNG ĐẾN VỚI THƯ VIỆN VIỆT ÂU</span><h1>Mỗi trang sách,<br/>một chân trời mới.</h1><p>Khám phá tri thức, nuôi dưỡng tư duy và phát triển bản thân mỗi ngày.</p><button className="gold-btn" onClick={onBrowse}>Khám phá kho sách <ChevronRight size={17}/></button></div><div className="hero-art"><div className="hero-book"><BookOpen size={60}/><b>TRI THỨC<br/>LÀ SỨC MẠNH</b></div></div></div>
    <div className="continue-card" onClick={() => onOpen(demoBooks[0])}><div className="continue-icon"><BookOpen size={28}/></div><div className="continue-copy"><span className="eyebrow">TIẾP TỤC ĐỌC</span><b>Hoàng tử bé</b><small>Antoine de Saint-Exupéry · Trang 48/120</small><div className="progress-track"><i style={{width:"40%"}}/></div></div><ChevronRight/></div>
    <div className="section-title"><div><span className="eyebrow">TUYỂN CHỌN</span><h2>Sách nổi bật</h2></div><button className="text-btn" onClick={onBrowse}>Xem tất cả <ChevronRight size={15}/></button></div>
    <div className="book-grid">{demoBooks.slice(0,4).map(b=><BookCard key={b.id} book={b} onClick={() => onOpen(b)} favorite={false} onFavorite={() => {}}/>)}</div>
    <div className="ai-banner"><div className="ai-icon"><BrainCircuit/></div><div><b>Khám phá cùng trợ lý đọc sách</b><p>Gợi ý sách và hỗ trợ tìm hiểu tri thức.</p></div><Sparkles/></div>
  </section>;
}
function BookCard({book,onClick,favorite,onFavorite}:{book:Book;onClick:()=>void;favorite:boolean;onFavorite:()=>void}) {
  return <article className="book-card"><button className="book-cover" onClick={onClick}><span className="cover-symbol"><BookOpen size={30}/></span><b>{book.title}</b><small>{book.author}</small><span className="cover-format">{book.format}</span></button><div className="book-card-meta"><button className="book-title" onClick={onClick}>{book.title}</button><button className="favorite-btn" aria-label="Yêu thích" onClick={onFavorite}><Heart size={17} fill={favorite?"#d58a46":"none"}/></button></div><small className="muted">{book.author}</small><span className="category-label">{book.category}</span></article>;
}
function Stat({label,value,note}:{label:string;value:string;note:string}) {
  return <div className="stat-card"><span>{label}</span><b>{value}</b><small>{note}</small></div>;
}
export default App;