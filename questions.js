const chapter1Questions = [
    {
        question: "Theo Nghị định 13/2023/NĐ-CP, dữ liệu cá nhân là gì?",
        answers: [
            "Thông tin của doanh nghiệp",
            "Thông tin dưới dạng ký hiệu, chữ viết, số, hình ảnh, âm thanh hoặc dạng tương tự gắn với một cá nhân cụ thể hoặc giúp xác định một cá nhân",
            "Thông tin bí mật nhà nước",
            "Thông tin chỉ tồn tại trên Internet"
        ],
        correct: 1,
        explanation: "Dữ liệu cá nhân là tất cả thông tin có thể xác định hoặc liên kết với một cá nhân cụ thể.",
        reference: "Nghị định 13/2023/NĐ-CP - Điều 2"
    },
    {
        question: "Đâu là ví dụ về dữ liệu cá nhân?",
        answers: [
            "Địa chỉ IP của máy chủ",
            "Tên và số CCCD của một người",
            "Tên miền website",
            "Địa chỉ công ty"
        ],
        correct: 1,
        explanation: "Tên và số CCCD có thể dùng để xác định danh tính một cá nhân.",
        reference: "Nghị định 13/2023/NĐ-CP - Điều 2"
    },
    {
        question: "Dữ liệu sinh trắc học thuộc loại dữ liệu nào?",
        answers: [
            "Dữ liệu công khai",
            "Dữ liệu cá nhân cơ bản",
            "Dữ liệu cá nhân nhạy cảm",
            "Dữ liệu doanh nghiệp"
        ],
        correct: 2,
        explanation: "Dữ liệu sinh trắc học được xếp vào nhóm dữ liệu cá nhân nhạy cảm.",
        reference: "Nghị định 13/2023/NĐ-CP - Điều 2"
    },
    {
        question: "Ai có trách nhiệm bảo vệ dữ liệu cá nhân?",
        answers: [
            "Chỉ cơ quan nhà nước",
            "Chỉ doanh nghiệp",
            "Mọi tổ chức và cá nhân tham gia xử lý dữ liệu",
            "Chỉ người sử dụng Internet"
        ],
        correct: 2,
        explanation: "Mọi tổ chức và cá nhân xử lý dữ liệu đều phải tuân thủ quy định bảo vệ dữ liệu cá nhân.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Hành vi nào sau đây KHÔNG phù hợp với các nguyên tắc bảo vệ dữ liệu cá nhân?",
        answers: [
            "Thu thập đúng mục đích",
            "Xin sự đồng ý của chủ thể dữ liệu",
            "Chia sẻ dữ liệu cho bên thứ ba khi chưa được phép",
            "Bảo mật dữ liệu"
        ],
        correct: 2,
        explanation: "Chia sẻ dữ liệu cá nhân khi chưa được phép là vi phạm quy định.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi nào dữ liệu cá nhân được coi là đã được thu thập hợp pháp?",
        answers: [
            "Khi người xử lý muốn",
            "Khi có mục đích rõ ràng và có căn cứ pháp lý",
            "Khi dữ liệu được công khai",
            "Khi bên thứ ba yêu cầu"
        ],
        correct: 1,
        explanation: "Dữ liệu cá nhân chỉ được thu thập khi có mục đích hợp lý và căn cứ pháp lý.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Chủ thể dữ liệu có quyền gì khi dữ liệu không còn cần thiết?",
        answers: [
            "Yêu cầu hủy hoặc xóa dữ liệu",
            "Yêu cầu tổ chức bán dữ liệu",
            "Yêu cầu sử dụng dữ liệu nhiều hơn",
            "Không có quyền gì"
        ],
        correct: 0,
        explanation: "Chủ thể dữ liệu có quyền yêu cầu hủy hoặc xóa dữ liệu khi mục đích xử lý không còn phù hợp.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân nhạy cảm gồm những thông tin nào?",
        answers: [
            "Số điện thoại của công ty",
            "Màu sắc yêu thích",
            "Giới tính và tình trạng hôn nhân",
            "Lượng truy cập web"
        ],
        correct: 2,
        explanation: "Thông tin về giới tính và tình trạng hôn nhân là dữ liệu nhạy cảm.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân dưới dạng âm thanh, hình ảnh có được xem là dữ liệu cá nhân không?",
        answers: [
            "Không nếu không ghi rõ tên",
            "Có nếu có thể xác định một cá nhân",
            "Chỉ khi có chữ ký số",
            "Chỉ khi ở dạng văn bản"
        ],
        correct: 1,
        explanation: "Hình ảnh hoặc âm thanh vẫn là dữ liệu cá nhân nếu có thể xác định được cá nhân.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];

const chapter2Questions = [
    {
        question: "Khi dữ liệu cá nhân bị xâm phạm, bước đầu tiên người xử lý cần làm là gì?",
        answers: [
            "Tiết lộ cho công chúng",
            "Báo cáo sự cố cho cơ quan quản lý và chủ thể dữ liệu",
            "Xóa toàn bộ dữ liệu ngay lập tức",
            "Đợi đến khi ai đó phát hiện"
        ],
        correct: 1,
        explanation: "Báo cáo sự cố là quy định bắt buộc khi dữ liệu cá nhân bị xâm phạm.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân chỉ được chuyển cho bên thứ ba khi nào?",
        answers: [
            "Khi doanh nghiệp muốn tăng doanh thu",
            "Khi chủ thể đồng ý hoặc pháp luật cho phép",
            "Khi dữ liệu đã cũ",
            "Khi người dùng không phản đối"
        ],
        correct: 1,
        explanation: "Chuyển dữ liệu cho bên thứ ba chỉ khi có sự đồng ý của chủ thể hoặc theo quy định pháp luật.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Nguyên tắc 'tối thiểu hóa dữ liệu' có nghĩa là gì?",
        answers: [
            "Thu thập càng nhiều càng tốt",
            "Chỉ thu thập dữ liệu cần thiết cho mục đích đã định",
            "Lưu trữ dữ liệu vĩnh viễn",
            "Chia sẻ dữ liệu với đồng nghiệp"
        ],
        correct: 1,
        explanation: "Chỉ thu thập dữ liệu cần thiết cho mục đích xử lý là nguyên tắc tối thiểu hóa.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Ai có thể yêu cầu truy cập dữ liệu cá nhân của mình?",
        answers: [
            "Người quản lý mạng xã hội",
            "Chủ thể dữ liệu",
            "Ngân hàng nhà nước",
            "Doanh nghiệp đối tác"
        ],
        correct: 1,
        explanation: "Chủ thể dữ liệu có quyền truy cập thông tin của chính mình.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân có thể được lưu trữ trong bao lâu?",
        answers: [
            "Vô thời hạn",
            "Cho đến khi mục đích xử lý kết thúc hoặc theo thời hạn pháp luật",
            "Chỉ một ngày",
            "Khi bên thứ ba yêu cầu"
        ],
        correct: 1,
        explanation: "Dữ liệu chỉ được lưu trữ khi còn cần thiết cho mục đích hoặc theo quy định pháp luật.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Người xử lý dữ liệu phải làm gì khi phát hiện dữ liệu bị truy cập trái phép?",
        answers: [
            "Bỏ qua và tiếp tục công việc",
            "Báo cáo ngay lập tức và phong tỏa nguồn truy cập",
            "Xóa hết dữ liệu ngay",
            "Đăng thông báo trên mạng xã hội"
        ],
        correct: 1,
        explanation: "Khi phát hiện truy cập trái phép, cần báo cáo ngay và phong tỏa để hạn chế thiệt hại.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Ai có quyền yêu cầu xóa dữ liệu khi mục đích không còn nữa?",
        answers: [
            "Người quản lý IT",
            "Chủ thể dữ liệu",
            "Bộ trưởng Bộ Y tế",
            "Bên thứ ba nhận dữ liệu"
        ],
        correct: 1,
        explanation: "Chủ thể dữ liệu có quyền yêu cầu xóa dữ liệu khi mục đích không còn phù hợp.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Việc cung cấp dữ liệu cho bên thứ ba cần dựa trên yếu tố nào?",
        answers: [
            "Sự đồng ý hoặc quy định pháp luật",
            "Thư điện tử tự phát",
            "Mục đích quảng cáo",
            "Số lượng dữ liệu lớn"
        ],
        correct: 0,
        explanation: "Cung cấp dữ liệu cho bên thứ ba chỉ khi có sự đồng ý hoặc quy định pháp luật cho phép.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Quyền được biết của chủ thể dữ liệu là gì?",
        answers: [
            "Biết rõ cách xử lý và mục đích dữ liệu của mình",
            "Biết mật khẩu của hệ thống",
            "Biết thông tin tài chính của công ty",
            "Biết danh tính hacker"
        ],
        correct: 0,
        explanation: "Chủ thể dữ liệu có quyền biết cách dữ liệu của họ được thu thập và xử lý.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];

const chapter3Questions = [
    {
        question: "Khi dữ liệu cá nhân bị xâm phạm, bên nào phải báo cáo sự cố?",
        answers: [
            "Chủ thể dữ liệu",
            "Người xử lý dữ liệu",
            "Ngân hàng nhà nước",
            "Bộ trưởng"
        ],
        correct: 1,
        explanation: "Người xử lý dữ liệu phải báo cáo sự cố xâm phạm dữ liệu.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Phân tích rủi ro dữ liệu cá nhân giúp gì?",
        answers: [
            "Tăng dung lượng lưu trữ",
            "Xác định và giảm thiểu nguy cơ rò rỉ dữ liệu",
            "Tạo báo cáo quảng cáo",
            "Xóa dữ liệu cũ"
        ],
        correct: 1,
        explanation: "Phân tích rủi ro nhằm xác định và giảm thiểu nguy cơ rò rỉ dữ liệu.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân nhạy cảm không nên xử lý khi nào?",
        answers: [
            "Khi có sự đồng thuận rõ ràng",
            "Khi không có sự đồng thuận rõ ràng",
            "Khi phục vụ pháp luật",
            "Khi điều tra tội phạm"
        ],
        correct: 1,
        explanation: "Dữ liệu nhạy cảm chỉ xử lý khi có sự đồng thuận rõ ràng hoặc pháp luật quy định.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Nếu chủ thể yêu cầu truy cập dữ liệu, bạn cần làm gì?",
        answers: [
            "Từ chối ngay lập tức",
            "Cung cấp thông tin chính xác và bảo mật",
            "Chia sẻ với mọi phòng ban",
            "Xóa dữ liệu của họ"
        ],
        correct: 1,
        explanation: "Cung cấp thông tin phù hợp theo quy định và đảm bảo bảo mật.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Lưu trữ dữ liệu chỉ được phép khi?",
        answers: [
            "Mục đích xử lý còn phù hợp",
            "Đã có quá nhiều dữ liệu",
            "Bên thứ ba yêu cầu",
            "Không có mục đích rõ ràng"
        ],
        correct: 0,
        explanation: "Dữ liệu chỉ được lưu trữ khi còn cần thiết cho mục đích xử lý.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Minh bạch trong bảo vệ dữ liệu có nghĩa là gì?",
        answers: [
            "Giấu thông tin cho chủ thể",
            "Thông báo cho chủ thể về cách thu thập và sử dụng dữ liệu",
            "Bán dữ liệu cho bên thứ ba",
            "Lưu trữ dữ liệu công khai"
        ],
        correct: 1,
        explanation: "Minh bạch là thông báo rõ cho chủ thể về cách dữ liệu được thu thập và sử dụng.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi dữ liệu bị xâm phạm, tổ chức nên thông báo cho ai?",
        answers: [
            "Chỉ cho đồng nghiệp",
            "Chủ thể dữ liệu và cơ quan quản lý",
            "Công chúng",
            "Chỉ hacker"
        ],
        correct: 1,
        explanation: "Thông báo cho chủ thể dữ liệu và cơ quan quản lý là trách nhiệm bắt buộc.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân phải được lưu trữ như thế nào?",
        answers: [
            "Không mã hóa và công khai",
            "Mã hóa và giới hạn truy cập",
            "Cho mọi người cùng tải về",
            "Lưu trữ ở máy tính cá nhân không bảo mật"
        ],
        correct: 1,
        explanation: "Mã hóa và giới hạn truy cập giúp bảo vệ dữ liệu cá nhân hiệu quả.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi nào bên nhận dữ liệu phải tuân thủ luật bảo vệ dữ liệu?",
        answers: [
            "Khi không liên quan đến chủ thể",
            "Khi xử lý dữ liệu cá nhân của chủ thể",
            "Khi dữ liệu đã bị xóa",
            "Khi dữ liệu ở dạng ẩn danh hoàn toàn"
        ],
        correct: 1,
        explanation: "Bên nhận dữ liệu phải tuân thủ luật khi xử lý dữ liệu cá nhân.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];

const chapter4Questions = [
    {
        question: "Bản chất của Firewall trong bảo mật là gì?",
        answers: [
            "Thiết bị in ấn tài liệu",
            "Hàng rào kiểm soát luồng dữ liệu vào ra",
            "Phần mềm soạn thảo văn bản",
            "Thiết bị lưu trữ dữ liệu"
        ],
        correct: 1,
        explanation: "Firewall kiểm soát luồng dữ liệu để ngăn truy cập trái phép.",
        reference: "Khuyến nghị an toàn thông tin"
    },
    {
        question: "Cập nhật phần mềm định kỳ giúp gì trong bảo mật?",
        answers: [
            "Giảm chi phí điện năng",
            "Khắc phục lỗ hổng và ngăn chặn tấn công",
            "Tăng dung lượng ổ cứng",
            "Làm chậm hệ thống"
        ],
        correct: 1,
        explanation: "Cập nhật phần mềm giúp khắc phục lỗ hổng bảo mật.",
        reference: "Khuyến nghị an toàn thông tin"
    },
    {
        question: "Khi phát hiện truy cập trái phép dữ liệu, hành động nên làm là gì?",
        answers: [
            "Bỏ qua và tiếp tục công việc",
            "Báo cáo ngay và phong tỏa nguồn truy cập",
            "Xóa dữ liệu ngay lập tức",
            "Đăng thông báo trên mạng xã hội"
        ],
        correct: 1,
        explanation: "Cần báo cáo và phong tỏa ngay để hạn chế thiệt hại.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Nguyên tắc xử lý dữ liệu cá nhân bao gồm gì?",
        answers: [
            "Xử lý không có mục đích",
            "Xử lý đúng mục đích và phù hợp pháp luật",
            "Xử lý cho mọi yêu cầu",
            "Xử lý tràn lan"
        ],
        correct: 1,
        explanation: "Dữ liệu phải được xử lý đúng mục đích và theo quy định pháp luật.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Cách nào giúp bảo vệ dữ liệu cá nhân tốt nhất?",
        answers: [
            "Chia sẻ mật khẩu cho đồng nghiệp",
            "Mã hóa và giới hạn truy cập",
            "Công khai dữ liệu cho mọi người",
            "Lưu trữ không kiểm soát"
        ],
        correct: 1,
        explanation: "Mã hóa và giới hạn truy cập giúp bảo vệ dữ liệu hiệu quả.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân cần được lưu trữ bao lâu?",
        answers: [
            "Vô thời hạn",
            "Cho đến khi mục đích xử lý kết thúc hoặc pháp luật yêu cầu",
            "Chỉ trong một ngày",
            "Khi công ty muốn"
        ],
        correct: 1,
        explanation: "Dữ liệu chỉ nên được lưu trữ khi còn cần thiết hoặc theo quy định.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Ai cần chịu trách nhiệm về an toàn dữ liệu?",
        answers: [
            "Chỉ nhân viên IT",
            "Chỉ giám đốc",
            "Mọi tổ chức và cá nhân xử lý dữ liệu",
            "Chỉ khách hàng"
        ],
        correct: 2,
        explanation: "Mọi tổ chức và cá nhân xử lý dữ liệu đều phải chịu trách nhiệm.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Nguyên tắc 'minh bạch' trong bảo vệ dữ liệu có nghĩa là gì?",
        answers: [
            "Giấu thông tin cho chủ thể",
            "Thông báo rõ cách dữ liệu được sử dụng",
            "Cung cấp dữ liệu cho bên thứ ba không cần phép",
            "Không báo cho chủ thể"
        ],
        correct: 1,
        explanation: "Minh bạch là thông báo rõ ràng cho chủ thể về cách xử lý dữ liệu của họ.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi bạn phát hiện lỗ hổng dữ liệu, bước đầu nên là gì?",
        answers: [
            "Tiếp tục chờ cấp trên",
            "Báo cáo và phong tỏa ngay lập tức",
            "Công khai lỗ hổng trên mạng",
            "Xóa dữ liệu liên quan"
        ],
        correct: 1,
        explanation: "Báo cáo và phong tỏa ngay giúp ngăn chặn rủi ro lan rộng.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];

const chapter5Questions = [
    {
        question: "Khi nào dữ liệu cá nhân có thể được xử lý mà không cần sự đồng ý?",
        answers: [
            "Khi phục vụ lợi ích thương mại",
            "Khi pháp luật quy định hoặc để thực hiện hợp đồng",
            "Khi muốn quảng cáo",
            "Khi dữ liệu đã cũ"
        ],
        correct: 1,
        explanation: "Dữ liệu có thể được xử lý khi pháp luật cho phép hoặc để thực hiện hợp đồng.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Quyền xóa dữ liệu cá nhân được áp dụng khi nào?",
        answers: [
            "Khi mục đích xử lý không còn phù hợp",
            "Khi doanh nghiệp muốn",
            "Khi dữ liệu đã được công khai",
            "Khi chủ thể đồng ý chia sẻ"
        ],
        correct: 0,
        explanation: "Chủ thể có quyền yêu cầu xóa khi mục đích xử lý không còn phù hợp.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Dữ liệu cá nhân được bảo vệ tốt nhất bằng cách nào?",
        answers: [
            "Lưu trữ trên máy tính cá nhân không mã hóa",
            "Mã hóa và kiểm soát truy cập",
            "Đăng tải công khai",
            "Giữ mật khẩu trong giấy viết tay"
        ],
        correct: 1,
        explanation: "Mã hóa và kiểm soát truy cập là biện pháp bảo vệ hiệu quả.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi dữ liệu bị tiết lộ trái phép, tổ chức cần thông báo cho ai?",
        answers: [
            "Chỉ đồng nghiệp",
            "Chủ thể dữ liệu và cơ quan quản lý",
            "Công chúng",
            "Bên thứ ba"
        ],
        correct: 1,
        explanation: "Tổ chức cần thông báo cho chủ thể dữ liệu và cơ quan quản lý.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Tiêu chí nào sau đây là hành vi xử lý dữ liệu đúng nguyên tắc?",
        answers: [
            "Thu thập vượt quá mục đích cần thiết",
            "Dữ liệu được xử lý phù hợp pháp luật và minh bạch",
            "Dữ liệu được lưu giữ vô thời hạn",
            "Chia sẻ dữ liệu không có căn cứ"
        ],
        correct: 1,
        explanation: "Dữ liệu phải được xử lý phù hợp pháp luật và theo nguyên tắc minh bạch.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi nào dữ liệu cá nhân được coi là 'ẩn danh'?",
        answers: [
            "Khi không thể xác định cá nhân từ dữ liệu đó",
            "Khi bỏ tên và số CCCD",
            "Khi gửi cho mọi người",
            "Khi mã hóa bằng mật khẩu đơn giản"
        ],
        correct: 0,
        explanation: "Dữ liệu ẩn danh là dữ liệu không thể dùng để xác định cá nhân.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Khi nào bên xử lý dữ liệu phải thực hiện đánh giá tác động bảo mật?",
        answers: [
            "Khi xử lý dữ liệu cá nhân nhạy cảm hoặc rủi ro cao",
            "Khi muốn tăng doanh thu",
            "Khi dữ liệu đã mất",
            "Khi công ty đổi tên"
        ],
        correct: 0,
        explanation: "Đánh giá tác động bảo mật cần khi xử lý dữ liệu nhạy cảm hoặc có rủi ro cao.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Trách nhiệm cá nhân của người xử lý dữ liệu là gì?",
        answers: [
            "Không cần tuân thủ pháp luật",
            "Tuân thủ quy định, bảo vệ và báo cáo rủi ro",
            "Chỉ Thu thập mọi dữ liệu có thể",
            "Chỉ lưu trữ dữ liệu ở máy chủ cá nhân"
        ],
        correct: 1,
        explanation: "Người xử lý dữ liệu phải tuân thủ quy định, bảo vệ dữ liệu và báo cáo rủi ro.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];

const bossQuestions = [
    {
        question: "Boss X muốn xâm nhập bằng cách thu thập dữ liệu trái phép. Bạn nên làm gì đầu tiên?",
        answers: [
            "Cho phép truy cập để đánh giá",
            "Khóa đường truyền và báo cáo sự cố",
            "Xóa dữ liệu ngay lập tức",
            "Công khai thông tin hacker"
        ],
        correct: 1,
        explanation: "Khi phát hiện truy cập trái phép, hành động đầu tiên là khóa đường truyền và báo cáo.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Boss X cố gắng yêu cầu chuyển dữ liệu cho bên thứ ba không được phép. Điều bạn cần làm là?",
        answers: [
            "Chấp nhận để thu thập thêm thông tin",
            "Từ chối và chỉ chuyển khi có sự đồng ý hoặc quy định pháp luật",
            "Chia sẻ ngay lập tức",
            "Không cần thông báo ai"
        ],
        correct: 1,
        explanation: "Dữ liệu chỉ được chuyển khi có sự đồng ý của chủ thể hoặc pháp luật cho phép.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Boss X nói rằng mã hóa không cần thiết. Bạn nên phản hồi như thế nào?",
        answers: [
            "Mã hóa là cần thiết để bảo vệ dữ liệu cá nhân",
            "Mã hóa chỉ làm chậm hệ thống",
            "Mã hóa không quan trọng nếu đã có Firewall",
            "Mã hóa chỉ dùng cho doanh nghiệp"
        ],
        correct: 0,
        explanation: "Mã hóa là biện pháp quan trọng để bảo vệ dữ liệu cá nhân ngay cả khi có Firewall.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Boss X cố gắng khai thác dữ liệu nhạy cảm. Quy định nào giúp bạn từ chối?",
        answers: [
            "Xử lý khi có sự đồng ý rõ ràng hoặc pháp luật cho phép",
            "Xử lý dữ liệu khi có lợi ích kinh doanh",
            "Xử lý mọi dữ liệu nếu hacker yêu cầu",
            "Xử lý dữ liệu nhạy cảm không cần điều kiện"
        ],
        correct: 0,
        explanation: "Dữ liệu nhạy cảm chỉ được xử lý khi có sự đồng ý rõ ràng hoặc theo pháp luật.",
        reference: "Nghị định 13/2023/NĐ-CP"
    },
    {
        question: "Boss X muốn bạn quên báo cáo sự cố. Bạn phải làm gì?",
        answers: [
            "Vẫn báo cáo sự cố cho cơ quan quản lý và chủ thể dữ liệu",
            "Giữ bí mật và không báo cáo",
            "Chỉ báo cáo khi được cấp trên yêu cầu",
            "Thay đổi dữ liệu trước khi báo cáo"
        ],
        correct: 0,
        explanation: "Báo cáo sự cố là nghĩa vụ bắt buộc khi dữ liệu bị xâm phạm.",
        reference: "Nghị định 13/2023/NĐ-CP"
    }
];