document.addEventListener("alpine:init", () => {
  Alpine.data("yotei", () => ({
    //予定一覧
    events: JSON.parse(localStorage.getItem("yotei") || "[]"),

    //日付
    date: new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),

    //予定
    text: "",

    //日付変換
    toDate(s) {
      const d = s.replace(/\D/g, "");
      if (d.length !== 4 && d.length !== 8) return s;
      const y = d.length === 4 ? new Date().getFullYear() : d.slice(0, 4);
      const md = d.length === 4 ? d : d.slice(4);
      return `${y}/${md.slice(0, 2)}/${md.slice(2)}`;
    },

    //追加して保存
    add() {
      if (!this.date || !this.text) return;
      this.events.push({ date: this.date, text: this.text });
      localStorage.setItem("yotei", JSON.stringify(this.events));
      this.text = "";
    },

    //日付順
    get sorted() {
      return [...this.events].sort((a, b) => a.date.localeCompare(b.date));
    },
  }));
});
