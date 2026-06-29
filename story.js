const storyChapters = [
    {
        title: "Chapter 1",
        background: "assets/backgrounds/office.jpg",
        avatars: {
            "Giám đốc": { src: "assets/characters/director.jpg", glow: false },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "⚠ HỆ THỐNG": { src: "assets/characters/system.jpg", glow: false },
            "Bạn": { src: "assets/characters/player.jpg", glow: false }
        },
        scenes: [
            { speaker: "Giám đốc", text: "Chào mừng bạn đến SkyData Corporation. Hôm nay là ngày đầu tiên bạn tham gia Trung tâm Điều hành An toàn thông tin." },
            { speaker: "ARES AI", text: "Tôi là ARES. Nhiệm vụ của tôi là giám sát luồng dữ liệu và cảnh báo khi có hành vi bất thường." },
            { speaker: "ARES AI", text: "Hiện tại chúng tôi đang quản lý hệ thống dữ liệu của hơn 3 triệu khách hàng và thiết lập tường lửa thế hệ mới." },
            { speaker: "⚠ HỆ THỐNG", text: "CẢNH BÁO! Đã phát hiện mẫu truy cập đáng ngờ từ bên ngoài vào vùng dữ liệu nhạy cảm." },
            { speaker: "Giám đốc", text: "Nhanh chóng xác nhận nguồn và chuẩn bị kịch bản bảo vệ. Chúng ta cần bạn hỗ trợ ngay lập tức." },
            { speaker: "ARES AI", text: "Trước khi hành động, hãy kiểm tra kiến thức về Luật Bảo vệ dữ liệu cá nhân. Chỉ có kiến thức mới mở khóa Firewall cấp cao." }
        ]
    },
    {
        title: "Chapter 2",
        background: "assets/backgrounds/server.png",
        avatars: {
            "Trưởng phòng": { src: "assets/characters/truongphong.png", glow: false },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "Bạn": { src: "assets/characters/player.jpg", glow: false },
            "BOSS X": { src: "assets/characters/hacker.jpg", glow: true }
        },
        scenes: [
            { speaker: "Trưởng phòng", text: "Vụ việc đã leo thang. Các máy chủ chính đang bị quét và dữ liệu bắt đầu có dấu hiệu rò rỉ." },
            { speaker: "ARES AI", text: "Tôi đã khoanh vùng lỗ hổng. Có kẻ đang cố xâm nhập vào trung tâm điều khiển, nhưng chưa thể đảm bảo Firewall đã kích hoạt đủ mạnh." },
            { speaker: "Bạn", text: "Tôi đã sẵn sàng. Hãy đưa tôi vào trạng thái ứng phó để bảo vệ hệ thống và khách hàng." },
            { speaker: "BOSS X", text: "Cứ tiếp tục! Tình trạng bảo mật của các người chỉ là trò đùa. Tôi đang khai thác ngay lúc này." },
            { speaker: "ARES AI", text: "Hoạt động của hacker cho thấy họ đang đánh giá mức độ hiểu biết về quy định và văn bản pháp luật. Hãy chứng minh bạn đủ trình để khóa truy cập." },
            { speaker: "Trưởng phòng", text: "Bạn là lá chắn cuối cùng. Phần tiếp theo sẽ yêu cầu phản xạ nhanh và kiến thức chuẩn xác." }
        ]
    },
    {
        title: "Chapter 3",
        background: "assets/backgrounds/soc.png",
        avatars: {
            "Chuyên gia": { src: "assets/characters/chuyengia.png", glow: false },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "Giám đốc": { src: "assets/characters/director.jpg", glow: false },
            "BOSS X": { src: "assets/characters/hacker.jpg", glow: true }
        },
        scenes: [
            { speaker: "Giám đốc", text: "Thời gian là rất cấp bách. Chúng ta cần phân tích kịch bản tấn công và tìm ra điểm yếu để phong tỏa." },
            { speaker: "Chuyên gia", text: "Lỗ hổng lớn nhất chính là sự thiếu hiểu biết về bảo vệ dữ liệu cá nhân. Tôi sẵn sàng chia sẻ ngay bây giờ." },
            { speaker: "ARES AI", text: "Tôi sẽ dẫn dắt bạn qua từng bước. Phân đoạn bảo mật tiếp theo tập trung vào nguyên tắc lưu trữ, quyền truy cập và trách nhiệm xử lý." },
            { speaker: "BOSS X", text: "Các người cứ nói tới nói lui, tôi sẽ tận dụng mỗi giây để sao chép dữ liệu. Firewall bổ sung sẽ chặn tôi hay chỉ làm tôi cười?" },
            { speaker: "Chuyên gia", text: "Đây là cơ hội để bạn áp dụng kiến thức. Nếu trả lời đúng, bạn sẽ tiến gần hơn đến việc vô hiệu hóa đường truyền của hacker." },
            { speaker: "Giám đốc", text: "Hãy giữ tâm lý bình tĩnh. Sau chương này, một bài kiểm tra sẽ xác nhận năng lực của bạn." }
        ]
    },
    {
        title: "Chapter 4",
        background: "assets/backgrounds/menu.jpg",
        avatars: {
            "Bạn": { src: "assets/characters/player.jpg", glow: false },
            "Giám đốc": { src: "assets/characters/director.jpg", glow: false },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "⚠ HỆ THỐNG": { src: "assets/characters/system.jpg", glow: false }
        },
        scenes: [
            { speaker: "Giám đốc", text: "Mức độ tấn công đang gia tăng. Hãy áp dụng quy trình khóa truy cập và kiểm tra độ chính xác của các câu trả lời." },
            { speaker: "Bạn", text: "Tôi đã nắm được yêu cầu. Hãy kích hoạt chế độ phòng thủ và tập trung vào các hành vi bảo mật dữ liệu." },
            { speaker: "ARES AI", text: "Hệ thống sẽ ghi nhận mọi hành động. Đúng hay sai đều sẽ ảnh hưởng đến Firewall. Hãy suy nghĩ cẩn thận." },
            { speaker: "⚠ HỆ THỐNG", text: "PHÁT HIỆN: Dữ liệu cá nhân đã bị truy cập bất hợp pháp. Cần khóa gấp các đường truyền thứ ba." },
            { speaker: "Giám đốc", text: "Khi qua được chương này, bạn sẽ mở khóa lớp Firewall thứ tư. Sau đó, hacker chỉ còn một con đường duy nhất." },
            { speaker: "Bạn", text: "Tôi đã sẵn sàng chiến đấu. Hãy chuyển sang bài kiểm tra để xem tôi đã đủ mạnh chưa." }
        ]
    },
    {
        title: "Chapter 5",
        background: "assets/backgrounds/ending.jpg",
        avatars: {
            "Bạn": { src: "assets/characters/player.jpg", glow: false },
            "BOSS X": { src: "assets/characters/hacker.jpg", glow: true },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "Giám đốc": { src: "assets/characters/director.jpg", glow: false }
        },
        scenes: [
            { speaker: "ARES AI", text: "Đây là chương cuối cùng trước khi đối mặt với Boss. Mục tiêu là đạt trình độ đủ để kích hoạt Firewall cao nhất." },
            { speaker: "BOSS X", text: "Ngươi đã đi rất xa. Nhưng vẫn chưa thể ngăn chặn ta. Ta sẽ phá hủy mọi lớp bảo vệ!" },
            { speaker: "Bạn", text: "Tôi sẽ bảo vệ dữ liệu này bằng mọi giá. Từ đây trở đi, mỗi quyết định đều quan trọng." },
            { speaker: "Giám đốc", text: "Hãy nhớ lại nguyên tắc cơ bản của Luật Bảo vệ dữ liệu cá nhân và khống chế quyền truy cập trái phép." },
            { speaker: "ARES AI", text: "Nếu bạn vượt qua bài kiểm tra này, hệ thống sẽ tự động chuẩn bị cho trận chiến cuối cùng với Boss X." },
            { speaker: "BOSS X", text: "Ta sẽ không để các ngươi yên. Quyền lực của ta nằm ở dữ liệu. Ngươi có dám đối đầu?" },
            { speaker: "Bạn", text: "Tôi đã sẵn sàng. Hãy bắt đầu vòng thử thách cuối cùng và khóa chặt lỗ hổng một lần cho tất cả." }
        ]
    }
];
