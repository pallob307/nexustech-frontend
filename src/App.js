import { useState, useContext, createContext } from "react";

const Ctx = createContext(null);

const PRODUCTS = [
  { id: "1", name: "iPhone 15 Pro Max", price: 149999, category: "Mobile", stock: 12, desc: "Apple A17 Pro chip, 48MP camera, titanium frame.", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", rating: 5 },
  { id: "2", name: "Samsung Galaxy S24 Ultra", price: 139999, category: "Mobile", stock: 8, desc: "200MP camera, S Pen, Galaxy AI features.", img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80", rating: 5 },
  { id: "3", name: "Sony WH-1000XM5", price: 32999, category: "Audio", stock: 25, desc: "Industry-leading noise cancelling. 30hr battery.", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", rating: 5 },
  { id: "4", name: "MacBook Pro 14 M3", price: 269999, category: "Computer", stock: 5, desc: "Apple M3 Pro chip, Liquid Retina XDR display.", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", rating: 5 },
  { id: "5", name: "PlayStation 5 Slim", price: 59999, category: "Gaming", stock: 3, desc: "Next-gen gaming. 120fps. Ray tracing. Ultra-fast SSD.", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80", rating: 5 },
  { id: "6", name: "Apple Watch Ultra 2", price: 89999, category: "Gadgets", stock: 15, desc: "49mm titanium case. Dual GPS. 60hr battery.", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&q=80", rating: 4 },
  { id: "7", name: "AirPods Pro 2nd Gen", price: 24999, category: "Audio", stock: 40, desc: "Active Noise Cancellation. Adaptive Audio.", img: "https://images.unsplash.com/photo-1606741965509-717c4b40ccdf?w=500&q=80", rating: 4 },
  { id: "8", name: "ASUS ROG Zephyrus G14", price: 179999, category: "Computer", stock: 7, desc: "AMD Ryzen 9, RTX 4060, 165Hz OLED display.", img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80", rating: 4 },
  { id: "9", name: "OnePlus 12", price: 69999, category: "Mobile", stock: 18, desc: "Snapdragon 8 Gen 3, Hasselblad camera.", img: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80", rating: 4 },
  { id: "10", name: "Xbox Series X", price: 54999, category: "Gaming", stock: 6, desc: "4K gaming. 120fps. 1TB SSD.", img: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&q=80", rating: 5 },
  { id: "11", name: "DJI Osmo Pocket 3", price: 39999, category: "Gadgets", stock: 22, desc: "4K 120fps, 1-inch CMOS sensor, 3-axis gimbal.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", rating: 4 },
  { id: "12", name: "Samsung 49 Odyssey G9", price: 119999, category: "Computer", stock: 4, desc: "Curved gaming monitor. 240Hz. DQHD resolution.", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", rating: 4 },
];

const CATS = ["All", "Mobile", "Audio", "Computer", "Gaming", "Gadgets"];

function Provider({ children }) {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selProduct, setSelProduct] = useState(null);
  const [orders, setOrders] = useState([
    { id: "ORD-001", items: "iPhone 15 Pro Max x1", total: 149999, status: "Delivered", date: "2025-01-10" },
    { id: "ORD-002", items: "Sony WH-1000XM5 x2", total: 65998, status: "Confirmed", date: "2025-02-15" },
  ]);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const go = (p, prod) => {
    setPage(p);
    if (prod) setSelProduct(prod);
    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const addCart = (p, qty) => {
    const q = qty || 1;
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + q } : i);
      return [...prev, { ...p, qty: q }];
    });
    notify(p.name + " added to cart!");
  };

  const removeCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) { removeCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ page, go, products, setProducts, cart, addCart, removeCart, updateQty, cartCount, cartTotal, user, setUser, selProduct, orders, setOrders, toast, notify, mobileMenu, setMobileMenu }}>
      {children}
    </Ctx.Provider>
  );
}

const useApp = () => useContext(Ctx);

const btn = { background: "#e8451e", color: "#fff", border: "none", padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: 1, display: "inline-flex", alignItems: "center", gap: 6 };
const btnO = { background: "transparent", color: "#f0ebe4", border: "1px solid #333", padding: "9px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" };
const inp = { background: "#0f0d0b", border: "1px solid #2a2520", color: "#f0ebe4", padding: "11px 14px", fontSize: 14, width: "100%", outline: "none", fontFamily: "inherit" };
const card = { background: "#141210", border: "1px solid #1e1c1a", overflow: "hidden", transition: "border-color .25s, transform .25s", cursor: "pointer" };
const tag = { display: "inline-block", padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 1 };
const lbl = { fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#e8451e", textTransform: "uppercase", marginBottom: 8 };
const sec = { maxWidth: 1300, margin: "0 auto", padding: "60px 20px" };
const divider = { height: 1, background: "#1e1c1a", margin: "20px 0" };

function Nav() {
  const { go, cartCount, user, setUser, mobileMenu, setMobileMenu } = useApp();
  return (
    <nav style={{ background: "#0d0b09", borderBottom: "1px solid #1e1c1a", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
        <div onClick={() => go("home")} style={{ fontWeight: 900, fontSize: 22, letterSpacing: 1, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, background: "#e8451e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>N</div>
          <span style={{ color: "#f0ebe4" }}>NEXUS<span style={{ color: "#e8451e" }}>TECH</span></span>
        </div>
        <div className="deskNav" style={{ display: "flex", gap: 4 }}>
          {["Shop", "Categories"].map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 13, fontWeight: 500, padding: "6px 10px" }}
              onMouseEnter={e => e.target.style.color = "#f0ebe4"} onMouseLeave={e => e.target.style.color = "#888"}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {user ? (
            <>
              {user.role === "admin" && <button style={{ ...btn, padding: "7px 14px", fontSize: 11 }} onClick={() => go("admin")}>ADMIN</button>}
              <button style={{ ...btnO, padding: "7px 14px", fontSize: 11 }} className="deskNav" onClick={() => go("dashboard")}>{user.name.split(" ")[0]}</button>
            </>
          ) : (
            <button style={{ ...btnO, padding: "7px 14px", fontSize: 11 }} className="deskNav" onClick={() => go("login")}>Sign In</button>
          )}
          <button onClick={() => go("cart")} style={{ ...btnO, display: "flex", alignItems: "center", gap: 6, padding: "7px 14px" }}>
            <span>🛒</span>
            {cartCount > 0 && <span style={{ background: "#e8451e", color: "#fff", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{cartCount}</span>}
          </button>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="hamBtn" style={{ background: "none", border: "1px solid #333", color: "#f0ebe4", width: 38, height: 38, cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, display: "none" }}>
            <span style={{ width: 16, height: 2, background: "#f0ebe4", display: "block" }} />
            <span style={{ width: 16, height: 2, background: "#f0ebe4", display: "block" }} />
            <span style={{ width: 16, height: 2, background: "#f0ebe4", display: "block" }} />
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div style={{ background: "#0d0b09", borderTop: "1px solid #1e1c1a", padding: "16px 20px" }}>
          {["shop", "categories"].map(l => (
            <button key={l} onClick={() => go(l)} style={{ display: "block", width: "100%", background: "none", border: "none", color: "#f0ebe4", padding: "12px 0", textAlign: "left", fontSize: 14, fontWeight: 600, borderBottom: "1px solid #1e1c1a", cursor: "pointer", textTransform: "capitalize" }}>{l}</button>
          ))}
          {!user
            ? <button style={{ ...btn, marginTop: 14, width: "100%", justifyContent: "center" }} onClick={() => go("login")}>Sign In</button>
            : <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button style={{ ...btnO, flex: 1, justifyContent: "center" }} onClick={() => go("dashboard")}>My Account</button>
                {user.role === "admin" && <button style={{ ...btn, flex: 1, justifyContent: "center" }} onClick={() => go("admin")}>Admin</button>}
              </div>
          }
        </div>
      )}
      <style>{`
        @media(max-width:768px){.deskNav{display:none!important;}.hamBtn{display:flex!important;}}
      `}</style>
    </nav>
  );
}

function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 999, background: "#141210", border: "1px solid #e8451e", padding: "12px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 10, maxWidth: 300 }}>
      <span style={{ color: "#2ecc71", fontWeight: 700 }}>✓</span>{toast}
    </div>
  );
}

function PCard({ p }) {
  const { go, addCart } = useApp();
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...card, transform: hov ? "translateY(-4px)" : "none", borderColor: hov ? "#e8451e" : "#1e1c1a" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => go("product", p)}>
      <div style={{ position: "relative", paddingTop: "72%", background: "#0f0d0b", overflow: "hidden" }}>
        <img src={p.img} alt={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
        {p.stock === 0 && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.65)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...tag, background: "#333", color: "#888" }}>Out of Stock</span>
          </div>
        )}
        {p.stock > 0 && p.stock <= 3 && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <span style={{ ...tag, background: "#e8a01e", color: "#000" }}>Only {p.stock} left</span>
          </div>
        )}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#e8451e", marginBottom: 6 }}>{p.category}</div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
        <div style={{ color: "#e8a01e", fontSize: 12, marginBottom: 12 }}>{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 900, fontSize: 20, color: "#e8451e" }}>৳{p.price.toLocaleString()}</span>
          <button style={{ ...btn, padding: "7px 12px", fontSize: 11 }}
            onClick={e => { e.stopPropagation(); addCart(p); }} disabled={p.stock === 0}>
            + CART
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const { go, products } = useApp();
  const [activeCat, setActiveCat] = useState("All");
  const shown = activeCat === "All" ? products : products.filter(p => p.category === activeCat);

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a0e0a 60%,#0a0a0a 100%)", padding: "80px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", right: "8%", width: 400, height: 400, background: "rgba(232,69,30,.08)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", position: "relative" }}>
          <div style={lbl}>New Collection 2025</div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(60px,10vw,120px)", lineHeight: 0.95, marginBottom: 20, color: "#f0ebe4" }}>
            NEXT-GEN<br /><span style={{ color: "#e8451e" }}>TECH</span><br />STARTS HERE
          </h1>
          <p style={{ color: "#888", fontSize: 16, lineHeight: 1.8, maxWidth: 460, marginBottom: 36 }}>
            Premium electronics at unbeatable prices. Authentic products, fast delivery across Bangladesh.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={btn} onClick={() => go("shop")}>EXPLORE SHOP →</button>
            <button style={btnO} onClick={() => go("categories")}>CATEGORIES</button>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      </div>

      <div style={{ background: "#e8451e", padding: "9px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "ticker 22s linear infinite", whiteSpace: "nowrap" }}>
          {["FREE DELIVERY OVER ৳5000","CASH ON DELIVERY","100% AUTHENTIC","30-DAY RETURNS","24/7 SUPPORT","FREE DELIVERY OVER ৳5000","CASH ON DELIVERY","100% AUTHENTIC","30-DAY RETURNS","24/7 SUPPORT"].map((t, i) => (
            <span key={i} style={{ padding: "0 40px", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#fff" }}>★ {t}</span>
          ))}
        </div>
      </div>

      <div style={{ background: "#0d0b09", borderBottom: "1px solid #1e1c1a" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {[["100+","Products"],["50K+","Customers"],["99%","Authentic"],["24/7","Support"]].map(([n, l]) => (
            <div key={l} style={{ padding: "28px 0", textAlign: "center", borderRight: "1px solid #1e1c1a" }}>
              <div style={{ fontWeight: 900, fontSize: 38, color: "#e8451e", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#555", marginTop: 4, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={sec}>
        <div style={lbl}>Browse by Type</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,52px)", marginBottom: 32 }}>SHOP BY CATEGORY</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: 12 }}>
          {[["📱","Mobile"],["🎧","Audio"],["💻","Computer"],["🎮","Gaming"],["⌚","Gadgets"]].map(([icon, name]) => (
            <div key={name} style={{ ...card, padding: "28px 16px", textAlign: "center" }} onClick={() => go("shop")}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#e8451e"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#1e1c1a"; e.currentTarget.style.transform="none"; }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 1, color: "#f0ebe4" }}>{name}</div>
              <div style={{ color: "#e8451e", fontSize: 11, marginTop: 4 }}>{products.filter(p => p.category === name).length} items</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...sec, paddingTop: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={lbl}>Trending Now</div>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,52px)" }}>FEATURED PRODUCTS</h2>
          </div>
          <button style={{ ...btnO, fontSize: 11 }} onClick={() => go("shop")}>View All →</button>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 24, paddingBottom: 4 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              style={{ background: activeCat === c ? "#e8451e" : "transparent", border: "1px solid " + (activeCat === c ? "#e8451e" : "#333"), color: activeCat === c ? "#fff" : "#888", padding: "7px 16px", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap", textTransform: "uppercase" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
          {shown.slice(0, 8).map(p => <PCard key={p.id} p={p} />)}
        </div>
      </div>

      <div style={{ background: "#e8451e", padding: "56px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "rgba(255,255,255,.7)", marginBottom: 8 }}>LIMITED TIME</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(28px,5vw,60px)", color: "#fff", marginBottom: 20 }}>FREE DELIVERY ON ORDERS ABOVE ৳5000</h2>
        <button onClick={() => go("shop")} style={{ background: "#fff", color: "#e8451e", border: "none", padding: "13px 36px", fontWeight: 900, fontSize: 13, cursor: "pointer", letterSpacing: 2 }}>SHOP NOW</button>
      </div>

      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function Shop() {
  const { products } = useApp();
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("default");

  let filtered = products.filter(p =>
    (cat === "All" || p.category === cat) &&
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    p.price <= maxPrice
  );
  if (sort === "asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div style={sec}>
      <div style={lbl}>Explore</div>
      <h1 style={{ fontWeight: 900, fontSize: "clamp(42px,6vw,72px)", marginBottom: 32 }}>ALL PRODUCTS</h1>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "flex-end" }}>
        <input style={{ ...inp, maxWidth: 260 }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={{ ...inp, maxWidth: 180 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
          <option value="rating">Best Rated</option>
        </select>
        <div style={{ minWidth: 200 }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600 }}>MAX: ৳{maxPrice.toLocaleString()}</div>
          <input type="range" min={1000} max={300000} step={1000} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: "100%", accentColor: "#e8451e" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 24, paddingBottom: 4 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            style={{ background: cat === c ? "#e8451e" : "transparent", border: "1px solid " + (cat === c ? "#e8451e" : "#333"), color: cat === c ? "#fff" : "#888", padding: "7px 16px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", textTransform: "uppercase" }}>
            {c}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 16, fontWeight: 600 }}>{filtered.length} products found</div>
      {filtered.length === 0
        ? <div style={{ textAlign: "center", padding: "80px 0", color: "#555" }}>No products found.</div>
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>{filtered.map(p => <PCard key={p.id} p={p} />)}</div>
      }
    </div>
  );
}

function ProductPage() {
  const { selProduct, go, addCart, products } = useApp();
  const [qty, setQty] = useState(1);
  const p = selProduct;
  if (!p) { go("shop"); return null; }
  const related = products.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4);

  return (
    <div style={sec}>
      <button onClick={() => go("shop")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 32 }}>← BACK TO SHOP</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 64 }} className="prodGrid">
        <div>
          <div style={{ background: "#0f0d0b", border: "1px solid #1e1c1a", overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <span style={{ ...tag, background: "#e8451e", color: "#fff", marginBottom: 12, display: "inline-block" }}>{p.category}</span>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(28px,3vw,46px)", lineHeight: 1.1, marginBottom: 10 }}>{p.name}</h1>
            <div style={{ color: "#e8a01e" }}>{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</div>
          </div>
          <div style={{ fontWeight: 900, fontSize: 48, color: "#e8451e", lineHeight: 1 }}>৳{p.price.toLocaleString()}</div>
          <p style={{ color: "#888", lineHeight: 1.9, fontSize: 14 }}>{p.desc}</p>
          <span style={{ ...tag, background: p.stock > 0 ? "#1a3a2a" : "#333", color: p.stock > 0 ? "#2ecc71" : "#888", display: "inline-block" }}>
            {p.stock > 0 ? "In Stock (" + p.stock + ")" : "Out of Stock"}
          </span>
          {p.stock > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#888" }}>QTY:</span>
              <div style={{ display: "flex", border: "1px solid #333" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 34, height: 34, background: "none", border: "none", color: "#f0ebe4", cursor: "pointer", fontSize: 16 }}>−</button>
                <span style={{ width: 38, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(Math.min(p.stock, qty + 1))} style={{ width: 34, height: 34, background: "none", border: "none", color: "#f0ebe4", cursor: "pointer", fontSize: 16 }}>+</button>
              </div>
            </div>
          )}
          <button style={{ ...btn, justifyContent: "center" }} disabled={p.stock === 0} onClick={() => addCart(p, qty)}>
            {p.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </button>
          <div style={{ background: "#0f0d0b", border: "1px solid #1e1c1a", padding: 16 }}>
            {[["🚚","Free Delivery","Orders over ৳5000"],["💵","Cash on Delivery","Pay when you receive"],["↩️","Easy Returns","30-day return policy"]].map(([icon, title, sub]) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #1e1c1a" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "#666" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div>
          <div style={lbl}>More Like This</div>
          <h2 style={{ fontWeight: 900, fontSize: 36, marginBottom: 24 }}>RELATED PRODUCTS</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>{related.map(r => <PCard key={r.id} p={r} />)}</div>
        </div>
      )}
      <style>{`@media(max-width:768px){.prodGrid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

function Cart() {
  const { cart, removeCart, updateQty, cartTotal, go, user } = useApp();
  if (cart.length === 0) return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <h2 style={{ fontWeight: 900, fontSize: 48, marginBottom: 12 }}>CART IS EMPTY</h2>
      <p style={{ color: "#888", marginBottom: 28 }}>Discover amazing tech products</p>
      <button style={btn} onClick={() => go("shop")}>BROWSE PRODUCTS</button>
    </div>
  );
  const delivery = cartTotal >= 5000 ? 0 : 120;
  return (
    <div style={sec}>
      <div style={lbl}>Review</div>
      <h1 style={{ fontWeight: 900, fontSize: "clamp(36px,5vw,60px)", marginBottom: 36 }}>YOUR CART</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, alignItems: "start" }} className="cartGrid">
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: "grid", gridTemplateColumns: "70px 1fr auto", gap: 14, padding: "18px 0", borderBottom: "1px solid #1e1c1a", alignItems: "center" }}>
              <img src={item.img} alt={item.name} style={{ width: 70, height: 56, objectFit: "cover", border: "1px solid #1e1c1a" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#e8451e" }}>{item.category}</div>
                <div style={{ fontWeight: 900, fontSize: 20, color: "#e8451e", marginTop: 6 }}>৳{item.price.toLocaleString()}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <div style={{ display: "flex", border: "1px solid #333" }}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, background: "none", border: "none", color: "#f0ebe4", cursor: "pointer" }}>−</button>
                  <span style={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, background: "none", border: "none", color: "#f0ebe4", cursor: "pointer" }}>+</button>
                </div>
                <div style={{ fontWeight: 900, fontSize: 16 }}>৳{(item.price * item.qty).toLocaleString()}</div>
                <button onClick={() => removeCart(item.id)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>REMOVE</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 24, position: "sticky", top: 80 }}>
          <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 18 }}>ORDER SUMMARY</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: "#888" }}>
            <span>Subtotal</span><span style={{ color: "#f0ebe4" }}>৳{cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: "#888" }}>
            <span>Delivery</span><span style={{ color: delivery === 0 ? "#2ecc71" : "#f0ebe4" }}>{delivery === 0 ? "FREE" : "৳120"}</span>
          </div>
          <div style={divider} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>TOTAL</span>
            <span style={{ fontWeight: 900, fontSize: 26, color: "#e8451e" }}>৳{(cartTotal + delivery).toLocaleString()}</span>
          </div>
          <button style={{ ...btn, width: "100%", justifyContent: "center", marginBottom: 10 }} onClick={() => go(user ? "checkout" : "login")}>
            {user ? "CHECKOUT →" : "LOGIN TO CHECKOUT →"}
          </button>
          <button style={{ ...btnO, width: "100%", justifyContent: "center" }} onClick={() => go("shop")}>CONTINUE SHOPPING</button>
        </div>
      </div>
      <style>{`@media(max-width:768px){.cartGrid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

function Checkout() {
  const { cart, cartTotal, go, user, setOrders, notify } = useApp();
  const [form, setForm] = useState({ name: user ? user.name : "", phone: "", address: "", city: "Khulna", note: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const delivery = cartTotal >= 5000 ? 0 : 120;
  const total = cartTotal + delivery;

  const place = () => {
    if (!form.name || !form.phone || !form.address) { notify("Please fill all required fields"); return; }
    setLoading(true);
    setTimeout(() => {
      const id = "ORD-" + Math.floor(Math.random() * 90000 + 10000);
      setOrders(prev => [{ id, items: cart.map(i => i.name + " x" + i.qty).join(", "), total, status: "Pending", date: new Date().toISOString().slice(0, 10) }, ...prev]);
      setLoading(false);
      setDone(true);
    }, 1400);
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
      <h2 style={{ fontWeight: 900, fontSize: 52, marginBottom: 10 }}>ORDER PLACED!</h2>
      <p style={{ color: "#888", marginBottom: 6 }}>Thank you for your order.</p>
      <p style={{ color: "#e8451e", fontSize: 13, fontWeight: 700, marginBottom: 32 }}>We will call you on {form.phone} to confirm.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button style={btn} onClick={() => go("shop")}>CONTINUE SHOPPING</button>
        <button style={btnO} onClick={() => go("dashboard")}>VIEW ORDERS</button>
      </div>
    </div>
  );

  return (
    <div style={sec}>
      <div style={lbl}>Almost There</div>
      <h1 style={{ fontWeight: 900, fontSize: "clamp(36px,5vw,60px)", marginBottom: 36 }}>CHECKOUT</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }} className="coGrid">
        <div>
          <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #1e1c1a" }}>DELIVERY INFORMATION</div>
          <div style={{ display: "grid", gap: 14 }}>
            {[["Full Name *","name"],["Phone Number *","phone"],["Delivery Address *","address"],["City","city"]].map(([label, field]) => (
              <div key={field}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                <input style={inp} placeholder={label.replace(" *", "")} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>ORDER NOTE (OPTIONAL)</div>
              <textarea style={{ ...inp, minHeight: 70, resize: "vertical" }} placeholder="Special instructions..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            </div>
          </div>
          <div style={{ background: "#0f0d0b", border: "1px solid #1e1c1a", padding: 16, marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 24 }}>💵</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>CASH ON DELIVERY</div>
              <div style={{ color: "#666", fontSize: 12, marginTop: 3 }}>Pay when your order arrives safely.</div>
            </div>
            <div style={{ marginLeft: "auto", width: 18, height: 18, border: "2px solid #e8451e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, background: "#e8451e", borderRadius: "50%" }} />
            </div>
          </div>
        </div>
        <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 24, alignSelf: "start", position: "sticky", top: 80 }}>
          <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 16 }}>ORDER DETAILS</div>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13 }}>
              <span style={{ color: "#888" }}>{item.name.slice(0, 18)}... x{item.qty}</span>
              <span>৳{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div style={divider} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#888" }}>
            <span>Delivery</span><span style={{ color: delivery === 0 ? "#2ecc71" : "#f0ebe4" }}>{delivery === 0 ? "FREE" : "৳120"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
            <span style={{ fontWeight: 700, fontSize: 13 }}>TOTAL</span>
            <span style={{ fontWeight: 900, fontSize: 26, color: "#e8451e" }}>৳{total.toLocaleString()}</span>
          </div>
          <button style={{ ...btn, width: "100%", justifyContent: "center" }} onClick={place} disabled={loading}>
            {loading ? "PROCESSING..." : "PLACE ORDER →"}
          </button>
        </div>
      </div>
      <style>{`@media(max-width:768px){.coGrid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

function Auth({ mode }) {
  const { go, setUser, notify } = useApp();
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        if (form.email === "admin@nexus.com" && form.password === "admin123") {
          setUser({ name: "Admin", email: form.email, role: "admin" });
          notify("Welcome, Admin!");
          go("admin");
        } else if (form.email && form.password) {
          setUser({ name: form.email.split("@")[0], email: form.email, role: "user" });
          notify("Logged in!");
          go("home");
        } else {
          notify("Invalid credentials");
        }
      } else {
        if (!form.name || !form.email || !form.password) { notify("Fill all fields"); setLoading(false); return; }
        setUser({ name: form.name, email: form.email, phone: form.phone, role: "user" });
        notify("Account created!");
        go("home");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontWeight: 900, fontSize: 24, marginBottom: 6 }}>NEXUS<span style={{ color: "#e8451e" }}>TECH</span></div>
          <h1 style={{ fontWeight: 900, fontSize: 44 }}>{isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}</h1>
        </div>

        <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 28 }}>
          <div style={{ display: "grid", gap: 14 }}>
            {!isLogin && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>FULL NAME</div>
                <input style={inp} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            {!isLogin && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>PHONE</div>
                <input style={inp} type="tel" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
            )}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>EMAIL</div>
              <input style={inp} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>PASSWORD</div>
              <input style={inp} type="password" placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button style={{ ...btn, width: "100%", justifyContent: "center", marginTop: 6 }} onClick={submit} disabled={loading}>
              {loading ? "PROCESSING..." : isLogin ? "SIGN IN →" : "CREATE ACCOUNT →"}
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, color: "#666", fontSize: 13 }}>
          {isLogin ? "No account? " : "Have account? "}
          <button onClick={() => go(isLogin ? "register" : "login")} style={{ background: "none", border: "none", color: "#e8451e", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, setUser, go, orders } = useApp();
  const [tab, setTab] = useState("orders");
  if (!user) { go("login"); return null; }

  return (
    <div style={sec}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={lbl}>Account</div>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,52px)" }}>HELLO, {user.name.toUpperCase()}</h1>
        </div>
        <button style={{ ...btnO, fontSize: 11 }} onClick={() => { setUser(null); go("home"); }}>SIGN OUT</button>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {["orders", "profile"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? "#e8451e" : "transparent", border: "1px solid " + (tab === t ? "#e8451e" : "#333"), color: tab === t ? "#fff" : "#888", padding: "8px 20px", fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}>
            {t}
          </button>
        ))}
      </div>
      {tab === "orders" && (
        <div style={{ overflowX: "auto" }}>
          {orders.length === 0
            ? <div style={{ color: "#555", textAlign: "center", padding: 60 }}>No orders yet.</div>
            : <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Order ID","Date","Items","Total","Status"].map(h => <th key={h} style={{ background: "#0f0d0b", padding: "11px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#555", borderBottom: "1px solid #1e1c1a", textTransform: "uppercase" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #1e1c1a" }}>
                      <td style={{ padding: "13px 14px", fontSize: 12, fontWeight: 700, color: "#e8451e" }}>{o.id}</td>
                      <td style={{ padding: "13px 14px", fontSize: 12, color: "#666" }}>{o.date}</td>
                      <td style={{ padding: "13px 14px", fontSize: 12, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.items}</td>
                      <td style={{ padding: "13px 14px", fontWeight: 900, fontSize: 18, color: "#e8451e" }}>৳{o.total.toLocaleString()}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <span style={{ ...tag, background: o.status === "Delivered" ? "#1a3a2a" : o.status === "Confirmed" ? "#3a2a0a" : "#2a2520", color: o.status === "Delivered" ? "#2ecc71" : o.status === "Confirmed" ? "#e8a01e" : "#888" }}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      )}
      {tab === "profile" && (
        <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 28, maxWidth: 480 }}>
          {[["Name", user.name],["Email", user.email],["Phone", user.phone || "—"],["Role", user.role]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", borderBottom: "1px solid #1e1c1a", fontSize: 14 }}>
              <span style={{ color: "#666", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PModal({ product, onClose }) {
  const { setProducts, notify } = useApp();
  const isEdit = !!product;
  const [f, setF] = useState({
    name: product ? product.name : "",
    price: product ? product.price : "",
    category: product ? product.category : "Mobile",
    stock: product ? product.stock : "",
    desc: product ? product.desc : "",
    img: product ? product.img : "",
  });

  const save = () => {
    if (!f.name || !f.price || !f.stock) { notify("Fill all required fields"); return; }
    if (isEdit) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, ...f, price: +f.price, stock: +f.stock } : p));
      notify("Product updated!");
    } else {
      setProducts(prev => [{ ...f, id: Date.now().toString(), price: +f.price, stock: +f.stock, rating: 4, img: f.img || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" }, ...prev]);
      notify("Product added and live!");
    }
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "#141210", border: "1px solid #1e1c1a", width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ padding: "22px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 900, fontSize: 26 }}>{isEdit ? "EDIT PRODUCT" : "ADD PRODUCT"}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 20 }}>x</button>
        </div>
        <div style={{ padding: 22, display: "grid", gap: 14 }}>
          {[["Product Name *","name","text"],["Price (BDT) *","price","number"],["Stock *","stock","number"]].map(([label, field, type]) => (
            <div key={field}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>{label.toUpperCase()}</div>
              <input style={inp} type={type} placeholder={label.replace(" *", "")} value={f[field]} onChange={e => setF({ ...f, [field]: e.target.value })} />
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>CATEGORY</div>
            <select style={inp} value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>
              {CATS.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>DESCRIPTION</div>
            <textarea style={{ ...inp, minHeight: 72, resize: "vertical" }} placeholder="Product description..." value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 7, letterSpacing: 1 }}>IMAGE URL</div>
            <input style={inp} placeholder="https://..." value={f.img} onChange={e => setF({ ...f, img: e.target.value })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6 }}>
            <button style={{ ...btnO, justifyContent: "center" }} onClick={onClose}>CANCEL</button>
            <button style={{ ...btn, justifyContent: "center" }} onClick={save}>{isEdit ? "SAVE" : "ADD PRODUCT"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Admin() {
  const { user, go, products, setProducts, orders, setOrders } = useApp();
  const [tab, setTab] = useState("overview");
  const [modal, setModal] = useState(false);
  const [editP, setEditP] = useState(null);
  if (!user || user.role !== "admin") { go("login"); return null; }
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 62px)" }}>
      <div style={{ width: 200, background: "#0a0806", borderRight: "1px solid #1e1c1a", padding: 20, flexShrink: 0 }} className="adminSide">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#e8451e", marginBottom: 20 }}>ADMIN PANEL</div>
        {[["overview","Overview"],["products","Products"],["orders","Orders"],["users","Users"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ display: "block", width: "100%", background: tab === id ? "rgba(232,69,30,.1)" : "none", border: "1px solid " + (tab === id ? "rgba(232,69,30,.3)" : "transparent"), color: tab === id ? "#f0ebe4" : "#666", padding: "9px 12px", textAlign: "left", cursor: "pointer", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: "28px 24px", overflow: "auto" }}>
        <div style={{ display: "none", gap: 6, marginBottom: 20, overflowX: "auto" }} className="adminTabs">
          {[["overview","Overview"],["products","Products"],["orders","Orders"],["users","Users"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? "#e8451e" : "transparent", border: "1px solid " + (tab === id ? "#e8451e" : "#333"), color: tab === id ? "#fff" : "#888", padding: "7px 14px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div>
            <div style={lbl}>Admin</div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(28px,4vw,48px)", marginBottom: 28 }}>DASHBOARD</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, marginBottom: 32 }}>
              {[["Products",products.length,"#e8451e"],["Orders",orders.length,"#3498db"],["Revenue","৳"+revenue.toLocaleString(),"#2ecc71"],["Pending",orders.filter(o=>o.status==="Pending").length,"#e8a01e"]].map(([label, val, color]) => (
                <div key={label} style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 22 }}>
                  <div style={{ fontWeight: 900, fontSize: 34, color, lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#555", marginTop: 5, textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 22 }}>
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 14 }}>RECENT ORDERS</div>
              {orders.slice(0, 5).map(o => (
                <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1e1c1a", fontSize: 12, gap: 10 }}>
                  <span style={{ color: "#e8451e", fontWeight: 700 }}>{o.id}</span>
                  <span style={{ color: "#888" }}>{o.date}</span>
                  <span style={{ ...tag, background: o.status === "Delivered" ? "#1a3a2a" : o.status === "Confirmed" ? "#3a2a0a" : "#2a2520", color: o.status === "Delivered" ? "#2ecc71" : o.status === "Confirmed" ? "#e8a01e" : "#888", fontSize: 10, padding: "2px 8px" }}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "products" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,40px)" }}>PRODUCTS</h1>
              <button style={btn} onClick={() => { setEditP(null); setModal(true); }}>+ ADD PRODUCT</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Image","Name","Category","Price","Stock","Actions"].map(h => <th key={h} style={{ background: "#0f0d0b", padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#555", borderBottom: "1px solid #1e1c1a", textTransform: "uppercase" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #1e1c1a" }}>
                      <td style={{ padding: "11px 14px" }}><img src={p.img} alt={p.name} style={{ width: 46, height: 38, objectFit: "cover", border: "1px solid #1e1c1a" }} /></td>
                      <td style={{ padding: "11px 14px", fontSize: 13, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "11px 14px" }}><span style={{ ...tag, background: "#1e1c1a", color: "#888", fontSize: 10 }}>{p.category}</span></td>
                      <td style={{ padding: "11px 14px", fontWeight: 900, fontSize: 18, color: "#e8451e" }}>৳{p.price.toLocaleString()}</td>
                      <td style={{ padding: "11px 14px" }}><span style={{ ...tag, background: p.stock === 0 ? "#2a2520" : p.stock <= 5 ? "#3a2a0a" : "#1a3a2a", color: p.stock === 0 ? "#888" : p.stock <= 5 ? "#e8a01e" : "#2ecc71", fontSize: 10 }}>{p.stock}</span></td>
                      <td style={{ padding: "11px 14px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => { setEditP(p); setModal(true); }} style={{ background: "none", border: "1px solid #333", color: "#f0ebe4", padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>EDIT</button>
                          <button onClick={() => setProducts(prev => prev.filter(pr => pr.id !== p.id))} style={{ background: "none", border: "1px solid rgba(232,69,30,.4)", color: "#e8451e", padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>DEL</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,40px)", marginBottom: 24 }}>ORDERS</h1>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Order ID","Date","Items","Total","Status","Update"].map(h => <th key={h} style={{ background: "#0f0d0b", padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#555", borderBottom: "1px solid #1e1c1a", textTransform: "uppercase" }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #1e1c1a" }}>
                      <td style={{ padding: "11px 14px", fontSize: 12, fontWeight: 700, color: "#e8451e" }}>{o.id}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12, color: "#666" }}>{o.date}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.items}</td>
                      <td style={{ padding: "11px 14px", fontWeight: 900, fontSize: 18, color: "#e8451e" }}>৳{o.total.toLocaleString()}</td>
                      <td style={{ padding: "11px 14px" }}><span style={{ ...tag, background: o.status === "Delivered" ? "#1a3a2a" : o.status === "Confirmed" ? "#3a2a0a" : "#2a2520", color: o.status === "Delivered" ? "#2ecc71" : o.status === "Confirmed" ? "#e8a01e" : "#888", fontSize: 10 }}>{o.status}</span></td>
                      <td style={{ padding: "11px 14px" }}>
                        <select value={o.status} onChange={e => setOrders(prev => prev.map(ord => ord.id === o.id ? { ...ord, status: e.target.value } : ord))}
                          style={{ background: "#0f0d0b", border: "1px solid #333", color: "#f0ebe4", padding: "6px 8px", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                          {["Pending","Confirmed","Delivered"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "users" && (
          <div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(26px,3vw,40px)", marginBottom: 24 }}>USERS</h1>
            <div style={{ background: "#141210", border: "1px solid #1e1c1a", padding: 24 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["#","Name","Email","Role","Orders"].map(h => <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#555", borderBottom: "1px solid #1e1c1a", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {[{id:1,name:"Admin User",email:"admin@nexus.com",role:"admin",orders:0},{id:2,name:"Test Customer",email:"customer@gmail.com",role:"user",orders:3},{id:3,name:"Rahim Uddin",email:"rahim@gmail.com",role:"user",orders:1}].map(u => (
                    <tr key={u.id} style={{ borderBottom: "1px solid #1e1c1a" }}>
                      <td style={{ padding: "12px 14px", color: "#555", fontSize: 12 }}>{u.id}</td>
                      <td style={{ padding: "12px 14px", fontWeight: 600 }}>{u.name}</td>
                      <td style={{ padding: "12px 14px", color: "#666", fontSize: 13 }}>{u.email}</td>
                      <td style={{ padding: "12px 14px" }}><span style={{ ...tag, background: u.role === "admin" ? "#e8451e" : "#1e1c1a", color: u.role === "admin" ? "#fff" : "#888", fontSize: 10 }}>{u.role}</span></td>
                      <td style={{ padding: "12px 14px", fontWeight: 700, color: "#e8451e" }}>{u.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {modal && <PModal product={editP} onClose={() => setModal(false)} />}
      <style>{`@media(max-width:768px){.adminSide{display:none!important;}.adminTabs{display:flex!important;}}`}</style>
    </div>
  );
}

function Categories() {
  const { go, products } = useApp();
  const cats = [
    { name: "Mobile", icon: "📱", desc: "Smartphones from top brands" },
    { name: "Audio", icon: "🎧", desc: "Headphones, earbuds and speakers" },
    { name: "Computer", icon: "💻", desc: "Laptops, monitors and accessories" },
    { name: "Gaming", icon: "🎮", desc: "Consoles, controllers and games" },
    { name: "Gadgets", icon: "⌚", desc: "Wearables and smart devices" },
  ];
  return (
    <div style={sec}>
      <div style={lbl}>Browse</div>
      <h1 style={{ fontWeight: 900, fontSize: "clamp(42px,6vw,80px)", marginBottom: 40 }}>CATEGORIES</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 14 }}>
        {cats.map(cat => {
          const count = products.filter(p => p.category === cat.name).length;
          return (
            <div key={cat.name} style={{ ...card, padding: "36px 28px" }} onClick={() => go("shop")}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#e8451e"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#1e1c1a"; e.currentTarget.style.transform="none"; }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>{cat.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 32, marginBottom: 6 }}>{cat.name}</div>
              <div style={{ color: "#666", fontSize: 14, marginBottom: 14 }}>{cat.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#e8451e" }}>{count} Products</span>
                <span style={{ color: "#e8451e", fontSize: 22 }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Footer() {
  const { go } = useApp();
  return (
    <footer style={{ background: "#080604", borderTop: "1px solid #1e1c1a", marginTop: 60 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "50px 20px 26px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 36, marginBottom: 36 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 10 }}>NEXUS<span style={{ color: "#e8451e" }}>TECH</span></div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.9 }}>Bangladesh's premier destination for authentic tech products.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#e8451e", marginBottom: 14 }}>QUICK LINKS</div>
            {["Home","Shop","Categories"].map(l => (
              <div key={l} onClick={() => go(l.toLowerCase())} style={{ color: "#555", fontSize: 13, padding: "4px 0", cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color="#f0ebe4"} onMouseLeave={e => e.target.style.color="#555"}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#e8451e", marginBottom: 14 }}>CONTACT</div>
            <div style={{ color: "#555", fontSize: 13, lineHeight: 2.2 }}>
              <div>📍 Khulna, Bangladesh</div>
              <div>📞 +880 1700-000000</div>
              <div>✉ hello@nexustech.bd</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e1c1a", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "#444", fontSize: 12 }}>2025 NEXUSTECH. ALL RIGHTS RESERVED.</span>
          <span style={{ color: "#444", fontSize: 12 }}>Cash on Delivery · Authentic Products</span>
        </div>
      </div>
    </footer>
  );
}

function Router() {
  const { page } = useApp();
  if (page === "shop") return <Shop />;
  if (page === "product") return <ProductPage />;
  if (page === "cart") return <Cart />;
  if (page === "checkout") return <Checkout />;
  if (page === "login") return <Auth mode="login" />;
  if (page === "register") return <Auth mode="register" />;
  if (page === "dashboard") return <Dashboard />;
  if (page === "admin") return <Admin />;
  if (page === "categories") return <Categories />;
  return <Home />;
}

export default function App() {
  return (
    <Provider>
      <div style={{ background: "#0a0a0a", color: "#f0ebe4", fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh" }}>
        <Nav />
        <main style={{ minHeight: "calc(100vh - 62px)" }}>
          <Router />
        </main>
        <Footer />
        <Toast />
      </div>
    </Provider>
  );
}
