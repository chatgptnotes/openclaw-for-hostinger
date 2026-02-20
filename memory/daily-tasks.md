# Daily Tasks Master Reference

*Last updated: 2026-02-20*

This is the single source of truth for all automated daily tasks. All tasks below are configured as **cron jobs** and run automatically.

---

## 🌅 Morning Schedule (6 AM - 9 AM)

| Time | Task | Target | Cron ID |
|------|------|--------|---------|
| 06:00 | Wake-up Call | Dr. Murali | `726bd74e` |
| 07:00 | Medicine Reminder | Dr. Murali | `0396f326` |
| 08:00 | Huddle 1-hour Reminder | Dr. Murali | `364abb27` |
| 08:00 | Roma Workout Reminder (for 3 PM) | Roma | `ecc2b424` |
| 08:00 | Hospital Occupancy Check | Sohail + Dr. Sachin → Dr. Murali | `a0cf89ca` |
| 08:30 | Huddle 30-min Reminder | Dr. Murali | `171d24a8` |
| 08:45 | Motivational Story | Dr. Murali | `b1e5da62` |
| 08:50 | Group Huddle Reminder | SOP Hope, Ayush, Raftaar group | `eab5661d` |

---

## 🏢 Daytime Schedule (9 AM - 6 PM)

| Time | Task | Target | Cron ID |
|------|------|--------|---------|
| 09:00, 12:00, 15:00, 18:00 | Cash Collection Follow-up | Priyanka (Accountant) | `ef32f214` |
| 10:00 | Ambulance Driver Follow-ups | Yawatmal/Sewagram drivers | `f871c210` |
| 10:00 | Electricity Bill Reminder | Shailesh, Gaurav ×2 | `98bdbe8f` |
| 10:00 (Mon-Fri) | Market Update (SENSEX/NIFTY) | Dr. Murali | `d2badd05` |
| 14:00 | Roma Pre-Workout Reminder | Roma | `a1e5faa5` |

---

## 🐕 Watchdog System

| Schedule | Task | ID |
|----------|------|----|
| 07:00 daily | WhatsApp Gateway Activation | `5005d6cf` |
| 07:30, 12:30, 18:30 | Cron Health Check | `180fce52` |
| Every 30 min | WhatsApp Reconnect Monitor (silent) | `e80fbb81` |

**What watchdogs do:**
- Verify cron scheduler is running
- Check WhatsApp gateway connection
- Count enabled jobs (should be 19+)
- Alert Dr. Murali if anything fails

---

## 🌙 Evening Schedule (6 PM - 9 PM)

| Time | Task | Target | Cron ID |
|------|------|--------|---------|
| 18:00 | Insulin Reminder | Dr. Murali | `75e109ef` |
| 19:00 | Cash Collection Daily Summary | Priyanka (Accountant) | `4663d5dd` |

---

## 📅 Monthly Tasks

| Day | Task | Target | Cron ID |
|-----|------|--------|---------|
| 28th | Monthly Bill Payment Reminder | Priyanka (Accountant) | `dd36b8e1` |

---

## 👥 Key Contacts

### Hospital Staff (Morning Huddle)
| Name | Phone | Role |
|------|-------|------|
| Gaurav | +91-98222-02396 | Admin |
| Dr. Shiraz | +91-93709-14454 | Quality |
| K J Shashank | +91-76204-56896 | - |
| Dr. Sachin | +91-72082-52712 | Marketing |
| Diksha | +91-86053-00668 | - |
| Neesha | +91-80072-41707 | - |
| Sister Shilpi | +91-6268-716635 | Nursing |
| Sonali | +91-72187-50394 | - |
| Abhishek | +91-95299-91074 | - |
| Azhar | +91-95955-85788 | - |
| Viji Murali | +91-9881820857 | Admin |
| Suraj Rajput | +91-98902-30165 | - |

### Accountants (Electricity Bills)
| Name | Phone |
|------|-------|
| Shailesh | +91-7385188459 |
| Gaurav Agrawal Hope | +91-9130090651 |
| Gaurav Agrawal | +91-9822202396 |

### Other Key Staff
| Name | Phone | Role |
|------|-------|------|
| Priyanka | +91-97663-12514 | Accountant (Cash Collection) |
| Roma | +91-95035-72204 | Workout Supervisor |

---

## 🚫 Exclusions (DO NOT Message)

- Aman Rajak (+91 93700 89063)
- OPD Referee Group
- Anand Thotange (+91 90282 95905)
- CA Nikhil Rathi (+91 94215 03171)
- Nitin Bawane (+91 90210 31409) - Not regular staff

---

## ⚠️ Alert Conditions

1. **Market Crash**: If SENSEX drops >2%, send ALERT immediately
2. **Urgent Email**: Check cmd@hopehospital.com for urgent mails

---

## 📝 Notes

- All times are IST (Asia/Calcutta)
- Cron jobs run automatically - no manual intervention needed
- To check status: `cron list`
- To run manually: `cron run --jobId <id>`
