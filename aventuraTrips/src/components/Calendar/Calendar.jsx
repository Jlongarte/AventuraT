import "./Calendar.css";

const monthsData = [
  {
    id: 1,
    name: "JANUARY",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646330/12_cxelua.webp",
    link: "/month/january",
  },
  {
    id: 2,
    name: "FEBRUARY",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/1a_flxzjg.webp",
    link: "/month/february",
  },
  {
    id: 3,
    name: "MARCH",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/2a_nh7jmk.webp",
    link: "/month/march",
  },
  {
    id: 4,
    name: "APRIL",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/3a_vrgkoq.webp",
    link: "/month/april",
  },
  {
    id: 5,
    name: "MAY",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/4_wrxvb5.webp",
    link: "/month/may",
  },
  {
    id: 6,
    name: "JUNE",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646332/5a_jubijb.webp",
    link: "/month/june",
  },
  {
    id: 7,
    name: "JULY",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646330/6a_frhqwt.webp",
    link: "/month/july",
  },
  {
    id: 8,
    name: "AUGUST",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646330/7a_r92q5j.webp",
    link: "/month/august",
  },
  {
    id: 9,
    name: "SEPTEMBER",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/8a_uupyye.webp",
    link: "/month/september",
  },
  {
    id: 10,
    name: "OCTOBER",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646331/9a_ihcxgk.webp",
    link: "/month/october",
  },
  {
    id: 11,
    name: "NOVEMBER",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646330/10_ndubty.webp",
    link: "/month/november",
  },
  {
    id: 12,
    name: "DECEMBER",
    img: "https://res.cloudinary.com/dzo0dufcr/image/upload/v1775646330/11_s6ay75.webp",
    link: "/month/december",
  },
];

const Calendar = () => {
  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Travel Calendar 2026</h1>
      <div className="calendar-grid">
        {monthsData.map((month) => (
          <a href={month.link} key={month.id} className="month-card">
            <div
              className="month-image"
              style={{ backgroundImage: `url(${month.img})` }}
            >
              <div className="month-overlay">
                <span className="month-name">{month.name}</span>
                <span className="month-btn">EXPLORE</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
