import type { Book } from "../types";

export const demoBooks: Book[] = [
  { id: "demo-1", code: "VA-BOOK-0001", title: "Hoàng tử bé", author: "Antoine de Saint-Exupéry", category: "Văn học", description: "Một câu chuyện giàu suy ngẫm về tình bạn, tình yêu và trách nhiệm.", format: "EPUB", pages: 120, progress: 40, allowDownload: false },
  { id: "demo-2", code: "VA-BOOK-0002", title: "Đắc nhân tâm", author: "Dale Carnegie", category: "Kỹ năng sống", description: "Những nguyên tắc giao tiếp và xây dựng mối quan hệ tích cực.", format: "PDF", pages: 256, progress: 0, allowDownload: true },
  { id: "demo-3", code: "VA-BOOK-0003", title: "Nhà giả kim", author: "Paulo Coelho", category: "Văn học", description: "Hành trình theo đuổi ước mơ và khám phá bản thân.", format: "EPUB", pages: 208, progress: 0, allowDownload: false },
  { id: "demo-4", code: "VA-BOOK-0004", title: "Tuổi trẻ đáng giá bao nhiêu", author: "Rosie Nguyễn", category: "Phát triển bản thân", description: "Gợi mở cách học tập, trải nghiệm và phát triển trong tuổi trẻ.", format: "PDF", pages: 285, progress: 0, allowDownload: true },
  { id: "demo-5", code: "VA-BOOK-0005", title: "Lược sử thời gian", author: "Stephen Hawking", category: "Khoa học", description: "Những câu hỏi lớn về vũ trụ, thời gian và nguồn gốc thế giới.", format: "PDF", pages: 212, progress: 0, allowDownload: false },
  { id: "demo-6", code: "VA-BOOK-0006", title: "Tôi tài giỏi, bạn cũng thế", author: "Adam Khoo", category: "Kỹ năng sống", description: "Phương pháp học tập và phát triển năng lực cá nhân.", format: "PDF", pages: 300, progress: 0, allowDownload: true }
];