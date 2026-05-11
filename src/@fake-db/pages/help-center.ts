// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import {
  HelpCenterCategoriesType,
  HelpCenterArticlesOverviewType,
  HelpCenterSubcategoryArticlesType
} from 'src/@fake-db/types'

type Data = {
  categories: HelpCenterCategoriesType[]
  keepLearning: HelpCenterArticlesOverviewType[]
  popularArticles: HelpCenterArticlesOverviewType[]
}

const data: Data = {
  popularArticles: [
    {
      slug: 'getting-started',
      title: 'Bắt đầu',
      img: '/images/pages/rocket.png',
      subtitle: 'Dù bạn là người mới hay người dùng thành thạo, bài viết này sẽ giúp bạn bắt đầu với Ứng dụng.'
    },
    {
      slug: 'first-steps',
      title: 'Những bước đầu tiên',
      img: '/images/pages/gift.png',
      subtitle: 'Bạn là khách hàng mới và đang thắc mắc làm thế nào để bắt đầu?'
    },
    {
      slug: 'external-content',
      title: 'Thêm nội dung bên ngoài',
      img: '/images/pages/external-content.png',
      subtitle: 'Bài viết này sẽ hướng dẫn bạn cách mở rộng tính năng của Ứng dụng.'
    }
  ],
  categories: [
    {
      icon: 'bx:rocket',
      avatarColor: 'success',
      slug: 'getting-started',
      title: 'Bắt đầu',
      subCategories: [
        {
          slug: 'account',
          icon: 'bx:cube',
          title: 'Tài khoản',
          articles: [
            {
              slug: 'changing-your-username',
              title: 'Thay đổi tên người dùng?',
              content:
                '<p>Bạn có thể thay đổi tên người dùng sang một tên khác chưa được sử dụng. Nếu tên bạn muốn không khả dụng, hãy cân nhắc các tên khác hoặc biến thể độc đáo. Sử dụng số, dấu gạch ngang, hoặc cách viết thay thế có thể giúp bạn tìm được tên người dùng tương tự còn trống.</p><p>Sau khi thay đổi, tên người dùng cũ của bạn sẽ được giải phóng để người khác sử dụng. Hầu hết các tham chiếu đến kho lưu trữ của bạn dưới tên cũ sẽ tự động chuyển sang tên mới. Tuy nhiên, một số liên kết đến hồ sơ của bạn sẽ không tự động chuyển hướng.</p><p>Bạn có thể thay đổi tên người dùng sang một tên khác chưa được sử dụng. Nếu tên bạn muốn không khả dụng, hãy cân nhắc các tên khác hoặc biến thể độc đáo. Sử dụng số, dấu gạch ngang, hoặc cách viết thay thế có thể giúp bạn tìm được tên người dùng tương tự còn trống.</p><p>Sau khi thay đổi, tên người dùng cũ của bạn sẽ được giải phóng để người khác sử dụng. Hầu hết các tham chiếu đến kho lưu trữ của bạn dưới tên cũ sẽ tự động chuyển sang tên mới. Tuy nhiên, một số liên kết đến hồ sơ của bạn sẽ không tự động chuyển hướng.</p>'
            },
            {
              slug: 'changing-your-primary-email-address',
              title: 'Thay đổi địa chỉ email chính?',
              content:
                '<p>Bạn có thể thay đổi địa chỉ email liên kết với tài khoản cá nhân bất kỳ lúc nào từ cài đặt tài khoản.</p><p><strong>Lưu ý:</strong> Bạn không thể thay đổi email chính sang email đã được đặt làm email dự phòng.</p><p>Bạn có thể thay đổi địa chỉ email liên kết với tài khoản cá nhân bất kỳ lúc nào từ cài đặt tài khoản.</p><p><strong>Lưu ý:</strong> Bạn không thể thay đổi email chính sang email đã được đặt làm email dự phòng.</p>'
            },
            {
              slug: 'changing-your-profile-picture',
              title: 'Thay đổi ảnh đại diện?',
              content:
                '<p>Bạn có thể thay đổi ảnh đại diện từ cài đặt tài khoản bất kỳ lúc nào.</p><p><strong>Lưu ý:</strong> Ảnh đại diện nên là file PNG, JPG, hoặc GIF, dung lượng dưới 1 MB và kích thước nhỏ hơn 3000 x 3000 pixel. Để có chất lượng hiển thị tốt nhất, chúng tôi khuyên dùng ảnh khoảng 500 x 500 pixel.</p><p>Bạn có thể thay đổi ảnh đại diện từ cài đặt tài khoản bất kỳ lúc nào.</p><p><strong>Lưu ý:</strong> Ảnh đại diện nên là file PNG, JPG, hoặc GIF, dung lượng dưới 1 MB và kích thước nhỏ hơn 3000 x 3000 pixel. Để có chất lượng hiển thị tốt nhất, chúng tôi khuyên dùng ảnh khoảng 500 x 500 pixel.</p>'
            },
            {
              slug: 'setting-your-profile-to-private',
              title: 'Đặt hồ sơ ở chế độ riêng tư?',
              content:
                '<p>Hồ sơ riêng tư chỉ hiển thị thông tin giới hạn và ẩn một số hoạt động.</p><p>Để ẩn các phần của trang hồ sơ, bạn có thể đặt hồ sơ ở chế độ riêng tư. Điều này cũng ẩn hoạt động của bạn trong các tính năng xã hội trên trang web. Hồ sơ riêng tư ẩn thông tin khỏi tất cả người dùng, và hiện tại không có tùy chọn để cho phép người dùng cụ thể xem hoạt động của bạn.</p><p>Bạn có thể thay đổi hồ sơ sang chế độ riêng tư trong cài đặt tài khoản.</p><p>Hồ sơ riêng tư chỉ hiển thị thông tin giới hạn và ẩn một số hoạt động.</p><p>Để ẩn các phần của trang hồ sơ, bạn có thể đặt hồ sơ ở chế độ riêng tư. Điều này cũng ẩn hoạt động của bạn trong các tính năng xã hội trên trang web. Hồ sơ riêng tư ẩn thông tin khỏi tất cả người dùng, và hiện tại không có tùy chọn để cho phép người dùng cụ thể xem hoạt động của bạn.</p><p>Bạn có thể thay đổi hồ sơ sang chế độ riêng tư trong cài đặt tài khoản.</p>'
            },
            {
              slug: 'deleting-your-personal-account',
              title: 'Xóa tài khoản cá nhân?',
              content:
                '<p>Xóa tài khoản cá nhân sẽ xóa dữ liệu liên quan đến tài khoản của bạn.</p><p>Khi bạn xóa tài khoản, chúng tôi sẽ ngừng thanh toán. Địa chỉ email liên kết với tài khoản sẽ được giải phóng để sử dụng cho tài khoản khác trên trang web. Sau 90 ngày, tên tài khoản cũng sẽ được giải phóng để người khác sử dụng cho tài khoản mới.</p><p>Xóa tài khoản cá nhân sẽ xóa dữ liệu liên quan đến tài khoản của bạn.</p><p>Khi bạn xóa tài khoản, chúng tôi sẽ ngừng thanh toán. Địa chỉ email liên kết với tài khoản sẽ được giải phóng để sử dụng cho tài khoản khác trên trang web. Sau 90 ngày, tên tài khoản cũng sẽ được giải phóng để người khác sử dụng cho tài khoản mới.</p>'
            }
          ]
        },
        {
          slug: 'authentication',
          title: 'Xác thực',
          icon: 'bx:lock-alt',
          articles: [
            {
              slug: 'how-to-create-a-strong-password',
              title: 'Làm thế nào để tạo mật khẩu mạnh?',
              content:
                '<p>Mật khẩu mạnh là một từ hoặc cụm từ độc đáo mà hacker không thể dễ dàng đoán hoặc bẻ khóa.</p><p>Để giữ an toàn cho tài khoản, chúng tôi khuyên bạn nên sử dụng mật khẩu có ít nhất 8 ký tự, bao gồm số, chữ cái thường và chữ cái in hoa.</p><p>Mật khẩu mạnh là một từ hoặc cụm từ độc đáo mà hacker không thể dễ dàng đoán hoặc bẻ khóa.</p><p>Để giữ an toàn cho tài khoản, chúng tôi khuyên bạn nên sử dụng mật khẩu có ít nhất 8 ký tự, bao gồm số, chữ cái thường và chữ cái in hoa.</p>'
            },
            {
              slug: 'what-is-2FA',
              title: 'Xác thực hai yếu tố là gì?',
              content:
                '<p>Xác thực hai yếu tố (2FA) là một lớp bảo mật bổ sung khi đăng nhập vào trang web hoặc ứng dụng. Với 2FA, bạn phải đăng nhập bằng tên người dùng và mật khẩu, đồng thời cung cấp một hình thức xác thực khác mà chỉ bạn biết hoặc có quyền truy cập.</p><p>Đối với ứng dụng của chúng tôi, hình thức xác thực thứ hai là mã được tạo bởi ứng dụng trên thiết bị di động của bạn hoặc được gửi qua tin nhắn SMS. Sau khi kích hoạt 2FA, ứng dụng sẽ tạo mã xác thực mỗi khi ai đó cố gắng đăng nhập vào tài khoản của bạn. Chỉ khi biết cả mật khẩu và có quyền truy cập mã xác thực trên điện thoại, người đó mới có thể đăng nhập vào tài khoản của bạn.</p><p>Xác thực hai yếu tố (2FA) là một lớp bảo mật bổ sung khi đăng nhập vào trang web hoặc ứng dụng. Với 2FA, bạn phải đăng nhập bằng tên người dùng và mật khẩu, đồng thời cung cấp một hình thức xác thực khác mà chỉ bạn biết hoặc có quyền truy cập.</p><p>Đối với ứng dụng của chúng tôi, hình thức xác thực thứ hai là mã được tạo bởi ứng dụng trên thiết bị di động của bạn hoặc được gửi qua tin nhắn SMS. Sau khi kích hoạt 2FA, ứng dụng sẽ tạo mã xác thực mỗi khi ai đó cố gắng đăng nhập vào tài khoản của bạn. Chỉ khi biết cả mật khẩu và có quyền truy cập mã xác thực trên điện thoại, người đó mới có thể đăng nhập vào tài khoản của bạn.</p>'
            },
            {
              slug: 'how-to-recover-account-if-you-lose-your-2fa-credentials',
              title: 'Làm thế nào để khôi phục tài khoản nếu mất thông tin xác thực 2FA?',
              content:
                '<p>Nếu bạn mất quyền truy cập vào thông tin xác thực hai yếu tố, bạn có thể sử dụng mã khôi phục hoặc tùy chọn khôi phục khác để lấy lại quyền truy cập vào tài khoản của mình.</p><p><strong>Cảnh báo:</strong> Vì lý do bảo mật, Bộ phận Hỗ trợ của chúng tôi có thể không khôi phục được quyền truy cập cho các tài khoản đã kích hoạt xác thực hai yếu tố nếu bạn mất thông tin xác thực hoặc mất quyền truy cập vào các phương pháp khôi phục tài khoản.</p><p>Nếu bạn mất quyền truy cập vào thông tin xác thực hai yếu tố, bạn có thể sử dụng mã khôi phục hoặc tùy chọn khôi phục khác để lấy lại quyền truy cập vào tài khoản của mình.</p><p><strong>Cảnh báo:</strong> Vì lý do bảo mật, Bộ phận Hỗ trợ của chúng tôi có thể không khôi phục được quyền truy cập cho các tài khoản đã kích hoạt xác thực hai yếu tố nếu bạn mất thông tin xác thực hoặc mất quyền truy cập vào các phương pháp khôi phục tài khoản.</p>'
            },
            {
              slug: 'how-to-review-security-logs',
              title: 'Làm thế nào để xem nhật ký bảo mật?',
              content:
                '<p>Bạn có thể xem nhật ký bảo mật cho tài khoản cá nhân để hiểu rõ hơn về các hành động bạn đã thực hiện và các hành động liên quan đến bạn do người khác thực hiện.</p><p>Bạn có thể tham khảo nhật ký bảo mật từ phần cài đặt.</p><p>Bạn có thể xem nhật ký bảo mật cho tài khoản cá nhân để hiểu rõ hơn về các hành động bạn đã thực hiện và các hành động liên quan đến bạn do người khác thực hiện.</p><p>Bạn có thể tham khảo nhật ký bảo mật từ phần cài đặt.</p>'
            }
          ]
        },
        {
          slug: 'billing',
          title: 'Thanh toán',
          icon: 'bx:dollar',
          articles: [
            {
              slug: 'how-to-update-payment-method',
              title: 'Làm thế nào để cập nhật phương thức thanh toán?',
              content:
                '<p>Bạn có thể thêm hoặc cập nhật phương thức thanh toán cho tài khoản của mình bất kỳ lúc nào.</p><p>Bạn có thể thanh toán bằng thẻ tín dụng hoặc tài khoản PayPal. Khi cập nhật phương thức thanh toán cho đăng ký tài khoản, phương thức mới sẽ tự động được áp dụng cho các đăng ký khác của bạn đối với các sản phẩm trả phí.</p><p>Bạn có thể thêm hoặc cập nhật phương thức thanh toán cho tài khoản của mình bất kỳ lúc nào.</p><p>Bạn có thể thanh toán bằng thẻ tín dụng hoặc tài khoản PayPal. Khi cập nhật phương thức thanh toán cho đăng ký tài khoản, phương thức mới sẽ tự động được áp dụng cho các đăng ký khác của bạn đối với các sản phẩm trả phí.</p>'
            },
            {
              slug: 'how-to-check-billing-date',
              title: 'Làm thế nào để kiểm tra ngày thanh toán?',
              content:
                '<p>Bạn có thể xem đăng ký tài khoản, các tính năng và sản phẩm trả phí khác, cũng như ngày thanh toán tiếp theo trong phần cài đặt thanh toán của tài khoản.</p><p>Bạn có thể xem đăng ký tài khoản, các tính năng và sản phẩm trả phí khác, cũng như ngày thanh toán tiếp theo trong phần cài đặt thanh toán của tài khoản.</p>'
            },
            {
              slug: 'how-to-change-billing-cycle',
              title: 'Làm thế nào để thay đổi chu kỳ thanh toán?',
              content:
                '<p>Bạn có thể thay đổi chu kỳ thanh toán từ phần cài đặt thanh toán trong tài khoản.</p><p>Khi thay đổi thời gian chu kỳ thanh toán, đăng ký của bạn trên ứng dụng, cùng với các tính năng và sản phẩm trả phí khác, sẽ được chuyển sang chu kỳ thanh toán mới vào ngày thanh toán tiếp theo.</p><p>Bạn có thể thay đổi chu kỳ thanh toán từ phần cài đặt thanh toán trong tài khoản.</p><p>Khi thay đổi thời gian chu kỳ thanh toán, đăng ký của bạn trên ứng dụng, cùng với các tính năng và sản phẩm trả phí khác, sẽ được chuyển sang chu kỳ thanh toán mới vào ngày thanh toán tiếp theo.</p>'
            },
            {
              slug: 'where-can-i-view-and-download-payment-receipt',
              title: 'Tôi có thể xem và tải biên lai thanh toán ở đâu?',
              content:
                '<p>Bạn có thể xem biên lai thanh toán từ phần cài đặt thanh toán trong tài khoản.</p><p>Bạn cũng có tùy chọn tải xuống hoặc chia sẻ biên lai thanh toán từ phần thanh toán.</p><p>Bạn có thể xem biên lai thanh toán từ phần cài đặt thanh toán trong tài khoản.</p><p>Bạn cũng có tùy chọn tải xuống hoặc chia sẻ biên lai thanh toán từ phần thanh toán.</p>'
            },
            {
              slug: 'how-to-set-billing-email',
              title: 'Làm thế nào để thiết lập email thanh toán?',
              content:
                '<p>Email chính của tài khoản cá nhân là nơi chúng tôi gửi biên lai và các thông tin liên quan đến thanh toán.</p><p>Email chính là địa chỉ email đầu tiên được liệt kê trong cài đặt email tài khoản của bạn. Chúng tôi cũng sử dụng email chính làm địa chỉ email thanh toán.</p><p>Nếu muốn thay đổi email thanh toán, bạn có thể thực hiện từ cài đặt tài khoản.</p><p>Email chính của tài khoản cá nhân là nơi chúng tôi gửi biên lai và các thông tin liên quan đến thanh toán.</p><p>Email chính là địa chỉ email đầu tiên được liệt kê trong cài đặt email tài khoản của bạn. Chúng tôi cũng sử dụng email chính làm địa chỉ email thanh toán.</p><p>Nếu muốn thay đổi email thanh toán, bạn có thể thực hiện từ cài đặt tài khoản.</p>'
            }
          ]
        }
      ]
    },
    {
      slug: 'orders',
      title: 'Đơn hàng',
      avatarColor: 'info',
      icon: 'bx-box',
      subCategories: [
        {
          slug: 'processing-orders',
          title: 'Xử lý đơn hàng',
          icon: 'bx-box',
          articles: [
            {
              slug: 'what-happens-when-you-receive-an-online-order',
              title: 'Điều gì xảy ra khi bạn nhận được đơn hàng trực tuyến?',
              content:
                '<p>Khi nhận được đơn hàng trực tuyến, bạn sẽ nhận được thông báo đơn hàng mới qua email.</p><p>Bạn sẽ thấy đơn hàng đó trên trang đơn hàng.</p><p>Khi nhận được đơn hàng trực tuyến, bạn sẽ nhận được thông báo đơn hàng mới qua email.</p><p>Bạn sẽ thấy đơn hàng đó trên trang đơn hàng.</p>'
            },
            {
              slug: 'what-happens-when-you-process-an-order',
              title: 'Điều gì xảy ra khi bạn xử lý đơn hàng?',
              content:
                '<p>Khi bạn xử lý một đơn hàng, trang Đơn hàng sẽ hiển thị đơn hàng với trạng thái thanh toán là Đã thanh toán hoặc Thanh toán một phần.</p><p>Nếu khách hàng cung cấp địa chỉ email, họ sẽ nhận được biên lai qua email.</p><p>Khi bạn xử lý một đơn hàng, trang Đơn hàng sẽ hiển thị đơn hàng với trạng thái thanh toán là Đã thanh toán hoặc Thanh toán một phần.</p><p>Nếu khách hàng cung cấp địa chỉ email, họ sẽ nhận được biên lai qua email.</p>'
            },
            {
              slug: 'how-to-cancel-an-order',
              title: 'Làm thế nào để hủy đơn hàng?',
              content:
                '<p>Hủy đơn hàng có nghĩa là bạn dừng xử lý đơn hàng. Ví dụ, nếu khách hàng yêu cầu hủy hoặc bạn nghi ngờ đơn hàng có dấu hiệu gian lận, bạn có thể hủy đơn hàng để ngăn nhân viên hoặc dịch vụ thực hiện tiếp tục xử lý. Bạn cũng có thể hủy đơn hàng nếu mặt hàng đã đặt không còn hàng.</p><p>Bạn có thể hủy đơn hàng bằng cách nhấp vào nút hủy trên trang đơn hàng.</p><p>Hủy đơn hàng có nghĩa là bạn dừng xử lý đơn hàng. Ví dụ, nếu khách hàng yêu cầu hủy hoặc bạn nghi ngờ đơn hàng có dấu hiệu gian lận, bạn có thể hủy đơn hàng để ngăn nhân viên hoặc dịch vụ thực hiện tiếp tục xử lý. Bạn cũng có thể hủy đơn hàng nếu mặt hàng đã đặt không còn hàng.</p><p>Bạn có thể hủy đơn hàng bằng cách nhấp vào nút hủy trên trang đơn hàng.</p>'
            },
            {
              slug: 'whats-the-status-of-my-order',
              title: 'Trạng thái đơn hàng của tôi là gì?',
              content:
                '<p>Bạn có thể kiểm tra trạng thái giao hàng của đơn hàng trên trang web hoặc ứng dụng. Nếu người bán thêm số theo dõi, bạn có thể sử dụng số đó để biết thông tin chi tiết về hành trình của gói hàng qua hãng vận chuyển.</p><p>Bạn sẽ thấy trạng thái giao hàng trên trang đơn hàng. Bạn cũng sẽ thấy ngày giao hàng dự kiến, giúp bạn biết khi nào đơn hàng có thể đến, và số theo dõi nếu có sẵn cho đơn hàng của bạn.</p><p>Bạn có thể kiểm tra trạng thái giao hàng của đơn hàng trên trang web hoặc ứng dụng. Nếu người bán thêm số theo dõi, bạn có thể sử dụng số đó để biết thông tin chi tiết về hành trình của gói hàng qua hãng vận chuyển.</p><p>Bạn sẽ thấy trạng thái giao hàng trên trang đơn hàng. Bạn cũng sẽ thấy ngày giao hàng dự kiến, giúp bạn biết khi nào đơn hàng có thể đến, và số theo dõi nếu có sẵn cho đơn hàng của bạn.</p>'
            },
            {
              slug: 'how-to-return-or-exchange-an-item',
              title: 'Làm thế nào để trả hoặc đổi hàng?',
              content:
                '<p>Nếu bạn cần trả hoặc đổi hàng, người bán mà bạn đã mua hàng là người tốt nhất để hỗ trợ. Mỗi người bán quản lý đơn hàng của riêng họ và quyết định về việc hủy, hoàn tiền, và trả hàng.</p><p>Người bán không bắt buộc phải chấp nhận trả hàng, đổi hàng, hoặc hoàn tiền trừ khi được nêu trong chính sách cửa hàng của họ. Truy cập trang chủ của cửa hàng và kéo xuống dưới để xem chính sách cửa hàng.</p><p>Nếu bạn cần trả hoặc đổi hàng, người bán mà bạn đã mua hàng là người tốt nhất để hỗ trợ. Mỗi người bán quản lý đơn hàng của riêng họ và quyết định về việc hủy, hoàn tiền, và trả hàng.</p><p>Người bán không bắt buộc phải chấp nhận trả hàng, đổi hàng, hoặc hoàn tiền trừ khi được nêu trong chính sách cửa hàng của họ. Truy cập trang chủ của cửa hàng và kéo xuống dưới để xem chính sách cửa hàng.</p>'
            }
          ]
        },
        {
          slug: 'payments',
          title: 'Thanh toán',
          icon: 'bx:dollar',
          articles: [
            {
              slug: 'how-do-i-get-paid',
              title: 'Làm thế nào để tôi nhận thanh toán?',
              content:
                '<p>Khi bạn thiết lập nhà cung cấp thanh toán để chấp nhận thanh toán bằng thẻ tín dụng, mỗi thanh toán phải được xử lý, vì vậy thường có độ trễ giữa khi khách hàng thanh toán đơn hàng và khi bạn nhận được tiền. Sau khi thanh toán được xử lý, số tiền mua hàng sẽ được chuyển vào tài khoản thương gia của bạn.</p><p>Khi bạn thiết lập nhà cung cấp thanh toán để chấp nhận thanh toán bằng thẻ tín dụng, mỗi thanh toán phải được xử lý, vì vậy thường có độ trễ giữa khi khách hàng thanh toán đơn hàng và khi bạn nhận được tiền. Sau khi thanh toán được xử lý, số tiền mua hàng sẽ được chuyển vào tài khoản thương gia của bạn.</p>'
            },
            {
              slug: 'how-often-do-i-get-paid',
              title: 'Tôi được thanh toán bao lâu một lần?',
              content:
                '<p>Nếu bạn sử dụng hệ thống thanh toán của chúng tôi, bạn có thể kiểm tra chu kỳ thanh toán để biết khi nào bạn nhận được khoản thanh toán từ các đơn hàng bằng thẻ tín dụng. Các nhà cung cấp thanh toán khác có quy định riêng về thời điểm bạn nhận được khoản thanh toán cho các đơn hàng bằng thẻ tín dụng. Hãy kiểm tra với nhà cung cấp của bạn để biết tần suất thanh toán.</p><p>Sau khi khoản thanh toán được gửi, ngân hàng của bạn có thể không nhận ngay lập tức. Có thể mất vài ngày sau khi khoản thanh toán được gửi để tiền được nạp vào tài khoản ngân hàng của bạn. Hãy kiểm tra với ngân hàng nếu bạn thấy khoản thanh toán bị trì hoãn.</p><p>Nếu bạn sử dụng hệ thống thanh toán của chúng tôi, bạn có thể kiểm tra chu kỳ thanh toán để biết khi nào bạn nhận được khoản thanh toán từ các đơn hàng bằng thẻ tín dụng. Các nhà cung cấp thanh toán khác có quy định riêng về thời điểm bạn nhận được khoản thanh toán cho các đơn hàng bằng thẻ tín dụng. Hãy kiểm tra với nhà cung cấp của bạn để biết tần suất thanh toán.</p><p>Sau khi khoản thanh toán được gửi, ngân hàng của bạn có thể không nhận ngay lập tức. Có thể mất vài ngày sau khi khoản thanh toán được gửi để tiền được nạp vào tài khoản ngân hàng của bạn. Hãy kiểm tra với ngân hàng nếu bạn thấy khoản thanh toán bị trì hoãn.</p>'
            },
            {
              slug: 'how-much-do-i-get-paid',
              title: 'Tôi được thanh toán bao nhiêu?',
              content:
                '<p>Bạn có thể bị tính một số phí giao dịch bên thứ ba cho các giao dịch trực tuyến. Đối với giao dịch thẻ tín dụng, nhà phát hành, đơn vị thu nhận, và công ty thẻ tín dụng đều tính một khoản phí nhỏ cho việc sử dụng dịch vụ của họ.</p><p>Bạn không bị tính phí giao dịch bên thứ ba cho các đơn hàng được xử lý qua hệ thống thanh toán của chúng tôi. Bạn chỉ trả phí xử lý thẻ tín dụng, tùy thuộc vào gói đăng ký của bạn. Nếu bạn sử dụng nhà cung cấp thanh toán bên thứ ba với chúng tôi, bạn sẽ bị tính phí giao dịch bên thứ ba.</p><p>Bạn có thể bị tính một số phí giao dịch bên thứ ba cho các giao dịch trực tuyến. Đối với giao dịch thẻ tín dụng, nhà phát hành, đơn vị thu nhận, và công ty thẻ tín dụng đều tính một khoản phí nhỏ cho việc sử dụng dịch vụ của họ.</p><p>Bạn không bị tính phí giao dịch bên thứ ba cho các đơn hàng được xử lý qua hệ thống thanh toán của chúng tôi. Bạn chỉ trả phí xử lý thẻ tín dụng, tùy thuộc vào gói đăng ký của bạn. Nếu bạn sử dụng nhà cung cấp thanh toán bên thứ ba với chúng tôi, bạn sẽ bị tính phí giao dịch bên thứ ba.</p>'
            },
            {
              slug: 'cant-complete-payment-on-paypal',
              title: 'Không thể hoàn tất thanh toán trên PayPal?',
              content:
                '<p>PayPal sử dụng nhiều biện pháp bảo mật để bảo vệ người dùng. Vì lý do này, PayPal có thể đôi khi ngăn người mua thanh toán cho người bán qua PayPal.</p><p>Nếu bạn không thể hoàn tất thanh toán, hãy thử làm việc với người bán để xác định phương thức thanh toán thay thế. Tìm hiểu cách liên hệ với người bán.</p><p>PayPal sử dụng nhiều biện pháp bảo mật để bảo vệ người dùng. Vì lý do này, PayPal có thể đôi khi ngăn người mua thanh toán cho người bán qua PayPal.</p><p>Nếu bạn không thể hoàn tất thanh toán, hãy thử làm việc với người bán để xác định phương thức thanh toán thay thế. Tìm hiểu cách liên hệ với người bán.</p>'
            },
            {
              slug: 'why-is-my-order-is-still-processing',
              title: 'Tại sao đơn hàng của tôi vẫn đang xử lý?',
              content:
                '<p>Nếu bạn nhận được email thông báo rằng đơn hàng của bạn vẫn đang xử lý, điều đó có nghĩa là giao dịch của bạn đang được kiểm tra bởi đối tác bên thứ ba của chúng tôi. Tất cả các đơn hàng thanh toán đều được kiểm tra để đảm bảo tính hợp pháp và bảo vệ khỏi gian lận có thể xảy ra.</p><p>Hầu hết các đơn hàng được xử lý trong vòng dưới 72 giờ. Bạn sẽ nhận được email xác nhận khi quá trình kiểm tra hoàn tất.</p><p>Nếu bạn nhận được email thông báo rằng đơn hàng của bạn vẫn đang xử lý, điều đó có nghĩa là giao dịch của bạn đang được kiểm tra bởi đối tác bên thứ ba của chúng tôi. Tất cả các đơn hàng thanh toán đều được kiểm tra để đảm bảo tính hợp pháp và bảo vệ khỏi gian lận có thể xảy ra.</p><p>Hầu hết các đơn hàng được xử lý trong vòng dưới 72 giờ. Bạn sẽ nhận được email xác nhận khi quá trình kiểm tra hoàn tất.</p>'
            }
          ]
        },
        {
          icon: 'bx:refresh',
          slug: 'returns-refunds-replacements',
          title: 'Trả hàng, Hoàn tiền và Thay thế',
          articles: [
            {
              slug: 'what-can-i-return',
              title: 'Tôi có thể trả lại những gì?',
              content:
                '<p>Bạn có thể yêu cầu trả lại hầu hết các mặt hàng mua từ người bán được liệt kê trên trang web. Tuy nhiên, bạn chỉ có thể trả lại các mặt hàng được xác định rõ ràng là "có thể trả lại" trên trang chi tiết sản phẩm và/hoặc chính sách của chúng tôi, và trong khoảng thời gian "cửa sổ trả hàng".</p><p>Vui lòng tham khảo chính sách Trả hàng trên trang web để biết danh mục nào là "không thể trả lại" và các cửa sổ trả hàng cụ thể cho các danh mục đủ điều kiện trả hàng.</p><ul><li>Bị hư hỏng vật lý</li><li>Thiếu bộ phận hoặc phụ kiện</li><li>Lỗi</li><li>Khác với mô tả trên trang chi tiết sản phẩm trên trang web</li></ul><p>Bạn có thể yêu cầu trả lại hầu hết các mặt hàng mua từ người bán được liệt kê trên trang web. Tuy nhiên, bạn chỉ có thể trả lại các mặt hàng được xác định rõ ràng là "có thể trả lại" trên trang chi tiết sản phẩm và/hoặc chính sách của chúng tôi, và trong khoảng thời gian "cửa sổ trả hàng".</p><p>Vui lòng tham khảo chính sách Trả hàng trên trang web để biết danh mục nào là "không thể trả lại" và các cửa sổ trả hàng cụ thể cho các danh mục đủ điều kiện trả hàng.</p><ul><li>Bị hư hỏng vật lý</li><li>Thiếu bộ phận hoặc phụ kiện</li><li>Lỗi</li><li>Khác với mô tả trên trang chi tiết sản phẩm trên trang web</li></ul>'
            },
            {
              slug: 'when-will-i-get-my-refund',
              title: 'Khi nào tôi nhận được tiền hoàn lại?',
              content:
                '<p>Dưới đây là thời gian xử lý hoàn tiền sau khi mặt hàng được chúng tôi hoặc người bán nhận lại:</p><ul><li><strong>Ví:</strong> 2 giờ</li><li><strong>Thẻ Tín dụng/Ghi nợ:</strong> 2-4 ngày làm việc</li><li><strong>Tài khoản Ngân hàng:</strong> 2-4 ngày làm việc</li></ul><p>Dưới đây là thời gian xử lý hoàn tiền sau khi mặt hàng được chúng tôi hoặc người bán nhận lại:</p><ul><li><strong>Ví:</strong> 2 giờ</li><li><strong>Thẻ Tín dụng/Ghi nợ:</strong> 2-4 ngày làm việc</li><li><strong>Tài khoản Ngân hàng:</strong> 2-4 ngày làm việc</li></ul>'
            },
            {
              slug: 'can-my-order-be-replaced',
              title: 'Đơn hàng của tôi có thể được thay thế không?',
              content:
                '<p>Nếu mặt hàng bạn đặt bị hư hỏng vật lý, lỗi, khác với mô tả trên trang chi tiết sản phẩm, hoặc thiếu bộ phận/phụ kiện, nó sẽ đủ điều kiện để thay thế miễn phí miễn là mặt hàng đó còn có sẵn từ cùng người bán.</p><p>Nếu mặt hàng bạn đặt bị hư hỏng vật lý, lỗi, khác với mô tả trên trang chi tiết sản phẩm, hoặc thiếu bộ phận/phụ kiện, nó sẽ đủ điều kiện để thay thế miễn phí miễn là mặt hàng đó còn có sẵn từ cùng người bán.</p>'
            }
          ]
        }
      ]
    },
    {
      icon: 'bx:group',
      slug: 'safety-security',
      avatarColor: 'primary',
      title: 'An toàn và Bảo mật',
      subCategories: [
        {
          slug: 'hacked-accounts',
          icon: 'bx:shield-quarter',
          title: 'Bảo mật và Tài khoản bị xâm phạm',
          articles: [
            {
              slug: 'has-my-account-been-compromised',
              title: 'Tài khoản của tôi có bị xâm phạm không?',
              content:
                '<p>Bạn có:</p><ul><li>Thấy bài đăng bất ngờ từ tài khoản của bạn</li><li>Thấy Tin nhắn Trực tiếp không mong muốn được gửi từ tài khoản của bạn</li><li>Quan sát các hành vi tài khoản khác mà bạn không thực hiện hoặc phê duyệt (như theo dõi, bỏ theo dõi, hoặc chặn)</li></ul><p>Nếu bạn trả lời có cho bất kỳ điều nào ở trên, vui lòng thay đổi mật khẩu và Hủy kết nối với các ứng dụng bên thứ ba.</p><p>Bạn có:</p><ul><li>Thấy bài đăng bất ngờ từ tài khoản của bạn</li><li>Thấy Tin nhắn Trực tiếp không mong muốn được gửi từ tài khoản của bạn</li><li>Quan sát các hành vi tài khoản khác mà bạn không thực hiện hoặc phê duyệt (như theo dõi, bỏ theo dõi, hoặc chặn)</li></ul><p>Nếu bạn trả lời có cho bất kỳ điều nào ở trên, vui lòng thay đổi mật khẩu và Hủy kết nối với các ứng dụng bên thứ ba.</p>'
            },
            {
              slug: 'how-to-keep-my-account-safe',
              title: 'Làm thế nào để giữ an toàn cho tài khoản của tôi?',
              content:
                '<p>Để giúp tài khoản của bạn an toàn, chúng tôi đề xuất các phương pháp tốt nhất sau:</p><ul><li>Sử dụng mật khẩu mạnh mà bạn không sử dụng lại trên các trang web khác.</li><li>Sử dụng xác thực hai yếu tố.</li><li>Yêu cầu email và số điện thoại để yêu cầu liên kết hoặc mã đặt lại mật khẩu.</li><li>Cẩn thận với các liên kết đáng ngờ và luôn đảm bảo bạn đang ở trên trang web của chúng tôi trước khi nhập thông tin đăng nhập.</li><li>Không bao giờ cung cấp tên người dùng và mật khẩu cho bên thứ ba, đặc biệt là những người hứa hẹn tăng người theo dõi, kiếm tiền, hoặc xác minh bạn.</li></ul><p>Để giúp tài khoản của bạn an toàn, chúng tôi đề xuất các phương pháp tốt nhất sau:</p><ul><li>Sử dụng mật khẩu mạnh mà bạn không sử dụng lại trên các trang web khác.</li><li>Sử dụng xác thực hai yếu tố.</li><li>Yêu cầu email và số điện thoại để yêu cầu liên kết hoặc mã đặt lại mật khẩu.</li><li>Cẩn thận với các liên kết đáng ngờ và luôn đảm bảo bạn đang ở trên trang web của chúng tôi trước khi nhập thông tin đăng nhập.</li><li>Không bao giờ cung cấp tên người dùng và mật khẩu cho bên thứ ba, đặc biệt là những người hứa hẹn tăng người theo dõi, kiếm tiền, hoặc xác minh bạn.</li></ul>'
            },
            {
              slug: 'help-with-my-hacked-account',
              title: 'Hỗ trợ với tài khoản bị hack',
              content:
                '<p>Nếu bạn nghĩ tài khoản của mình bị hack và không thể đăng nhập bằng tên người dùng và mật khẩu, vui lòng thực hiện hai bước sau:</p><ol><li><p>Yêu cầu đặt lại mật khẩu</p><p>Đặt lại mật khẩu bằng cách yêu cầu email từ biểu mẫu đặt lại mật khẩu. Hãy thử nhập cả tên người dùng và địa chỉ email, và kiểm tra email đặt lại tại địa chỉ liên kết với tài khoản của bạn.</p></li><li><p>Liên hệ Hỗ trợ nếu bạn vẫn cần hỗ trợ</p><p>Nếu vẫn không thể đăng nhập, hãy liên hệ với chúng tôi bằng cách gửi Yêu cầu Hỗ trợ. Đảm bảo sử dụng địa chỉ email liên kết với tài khoản bị hack; chúng tôi sẽ gửi thêm thông tin và hướng dẫn đến địa chỉ email đó. Khi gửi yêu cầu hỗ trợ, vui lòng cung cấp cả tên người dùng và ngày bạn truy cập tài khoản lần cuối.</p></li></ol><p>Nếu bạn nghĩ tài khoản của mình bị hack và không thể đăng nhập bằng tên người dùng và mật khẩu, vui lòng thực hiện hai bước sau:</p><ol><li><p>Yêu cầu đặt lại mật khẩu</p><p>Đặt lại mật khẩu bằng cách yêu cầu email từ biểu mẫu đặt lại mật khẩu. Hãy thử nhập cả tên người dùng và địa chỉ email, và kiểm tra email đặt lại tại địa chỉ liên kết với tài khoản của bạn.</p></li><li><p>Liên hệ Hỗ trợ nếu bạn vẫn cần hỗ trợ</p><p>Nếu vẫn không thể đăng nhập, hãy liên hệ với chúng tôi bằng cách gửi Yêu cầu Hỗ trợ. Đảm bảo sử dụng địa chỉ email liên kết với tài khoản bị hack; chúng tôi sẽ gửi thêm thông tin và hướng dẫn đến địa chỉ email đó. Khi gửi yêu cầu hỗ trợ, vui lòng cung cấp cả tên người dùng và ngày bạn truy cập tài khoản lần cuối.</p></li></ol>'
            }
          ]
        },
        {
          slug: 'privacy',
          title: 'Quyền riêng tư',
          icon: 'bx:lock-alt',
          articles: [
            {
              slug: 'what-is-visible-on-my-profile',
              title: 'Những gì hiển thị trên hồ sơ của tôi?',
              content:
                '<p>Hầu hết thông tin hồ sơ bạn cung cấp cho chúng tôi luôn công khai, như tiểu sử, vị trí, trang web, và hình ảnh. Đối với một số trường thông tin hồ sơ, chúng tôi cung cấp cài đặt quyền hiển thị để bạn chọn ai có thể thấy thông tin này trong hồ sơ của bạn.</p><p>Nếu bạn cung cấp thông tin hồ sơ và không thấy cài đặt quyền hiển thị, thông tin đó là công khai.</p><p>Hầu hết thông tin hồ sơ bạn cung cấp cho chúng tôi luôn công khai, như tiểu sử, vị trí, trang web, và hình ảnh. Đối với một số trường thông tin hồ sơ, chúng tôi cung cấp cài đặt quyền hiển thị để bạn chọn ai có thể thấy thông tin này trong hồ sơ của bạn.</p><p>Nếu bạn cung cấp thông tin hồ sơ và không thấy cài đặt quyền hiển thị, thông tin đó là công khai.</p>'
            },
            {
              slug: 'should-i-turn-on-precise-location',
              title: 'Tôi có nên bật vị trí chính xác không?',
              content:
                '<p>Việc bật vị trí chính xác qua ứng dụng chính thức của chúng tôi cho phép chúng tôi thu thập, lưu trữ và sử dụng vị trí chính xác của bạn, như thông tin GPS. Điều này giúp chúng tôi cung cấp, phát triển và cải thiện nhiều dịch vụ, bao gồm nhưng không giới hạn:</p><ul><li>Cung cấp nội dung, bao gồm bài đăng và quảng cáo, phù hợp hơn với vị trí của bạn.</li><li>Cung cấp xu hướng liên quan đến vị trí.</li><li>Hiển thị vị trí bạn đang đăng bài cho người theo dõi, nếu bạn chọn gắn thẻ địa lý bài đăng của mình.</li></ul><p>Việc bật vị trí chính xác qua ứng dụng chính thức của chúng tôi cho phép chúng tôi thu thập, lưu trữ và sử dụng vị trí chính xác của bạn, như thông tin GPS. Điều này giúp chúng tôi cung cấp, phát triển và cải thiện nhiều dịch vụ, bao gồm nhưng không giới hạn:</p><ul><li>Cung cấp nội dung, bao gồm bài đăng và quảng cáo, phù hợp hơn với vị trí của bạn.</li><li>Cung cấp xu hướng liên quan đến vị trí.</li><li>Hiển thị vị trí bạn đang đăng bài cho người theo dõi, nếu bạn chọn gắn thẻ địa lý bài đăng của mình.</li></ul>'
            },
            {
              slug: 'what-location-information-is-displayed',
              title: 'Thông tin vị trí nào được hiển thị?',
              content:
                '<ul><li>Tất cả thông tin định vị địa lý bắt đầu từ một vị trí (kinh độ và vĩ độ), được gửi từ trình duyệt hoặc thiết bị của bạn. Chúng tôi sẽ không hiển thị bất kỳ thông tin vị trí nào trừ khi bạn đã chọn tham gia tính năng này và cho phép thiết bị hoặc trình duyệt của bạn truyền tọa độ đến chúng tôi.</li><li>Nếu bạn chọn gắn thông tin vị trí vào bài đăng, nhãn vị trí bạn chọn sẽ hiển thị bên dưới văn bản của bài đăng.</li><li>Khi bạn sử dụng máy ảnh trong ứng dụng trên iOS và Android để gắn ảnh hoặc video vào bài đăng và bật tùy chọn gắn thẻ vị trí chính xác, bài đăng đó sẽ bao gồm cả nhãn vị trí bạn chọn và vị trí chính xác của thiết bị (kinh độ và vĩ độ), có thể truy xuất qua API. Vị trí chính xác của bạn có thể cụ thể hơn nhãn vị trí bạn chọn. Điều này hữu ích khi chia sẻ những khoảnh khắc tại chỗ.</li></ul><ul><li>Tất cả thông tin định vị địa lý bắt đầu từ một vị trí (kinh độ và vĩ độ), được gửi từ trình duyệt hoặc thiết bị của bạn. Chúng tôi sẽ không hiển thị bất kỳ thông tin vị trí nào trừ khi bạn đã chọn tham gia tính năng này và cho phép thiết bị hoặc trình duyệt của bạn truyền tọa độ đến chúng tôi.</li><li>Nếu bạn chọn gắn thông tin vị trí vào bài đăng, nhãn vị trí bạn chọn sẽ hiển thị bên dưới văn bản của bài đăng.</li><li>Khi bạn sử dụng máy ảnh trong ứng dụng trên iOS và Android để gắn ảnh hoặc video vào bài đăng và bật tùy chọn gắn thẻ vị trí chính xác, bài đăng đó sẽ bao gồm cả nhãn vị trí bạn chọn và vị trí chính xác của thiết bị (kinh độ và vĩ độ), có thể truy xuất qua API. Vị trí chính xác của bạn có thể cụ thể hơn nhãn vị trí bạn chọn. Điều này hữu ích khi chia sẻ những khoảnh khắc tại chỗ.</li></ul>'
            }
          ]
        },
        {
          slug: 'spam-fake-accounts',
          title: 'Thư rác và Tài khoản giả mạo',
          icon: 'bx:envelope',
          articles: [
            {
              slug: 'how-to-detect-fake-email',
              title: 'Làm thế nào để phát hiện email giả mạo?',
              content: `<p>Chúng tôi chỉ gửi email từ @${themeConfig.templateName}.com hoặc @t.${themeConfig.templateName}.com. Tuy nhiên, một số người có thể nhận được email giả mạo hoặc đáng ngờ trông giống như do chúng tôi gửi. Những email này có thể chứa tệp đính kèm độc hại hoặc liên kết đến các trang web lừa đảo hoặc thư rác. Vui lòng biết rằng chúng tôi không bao giờ gửi email có tệp đính kèm hoặc yêu cầu mật khẩu của bạn qua email.</p><p>Chúng tôi chỉ gửi email từ @${themeConfig.templateName}.com hoặc @t.${themeConfig.templateName}.com. Tuy nhiên, một số người có thể nhận được email giả mạo hoặc đáng ngờ trông giống như do chúng tôi gửi. Những email này có thể chứa tệp đính kèm độc hại hoặc liên kết đến các trang web lừa đảo hoặc thư rác. Vui lòng biết rằng chúng tôi không bao giờ gửi email có tệp đính kèm hoặc yêu cầu mật khẩu của bạn qua email.</p>`
            },
            {
              slug: 'how-do-I-report-an-impersonation-violation',
              title: 'Làm thế nào để báo cáo vi phạm giả mạo danh tính?',
              content:
                '<p>Nếu bạn tin rằng một tài khoản đang giả mạo bạn hoặc thương hiệu của bạn, bạn hoặc đại diện được ủy quyền có thể gửi báo cáo tại Trung tâm Hỗ trợ của chúng tôi.</p><p>Nếu bạn tin rằng một tài khoản đang lạm dụng danh tính của người khác, bạn có thể báo cáo trực tiếp từ hồ sơ của tài khoản đó với tư cách là người ngoài cuộc.</p><p>Nếu bạn tin rằng một tài khoản đang giả mạo bạn hoặc thương hiệu của bạn, bạn hoặc đại diện được ủy quyền có thể gửi báo cáo tại Trung tâm Hỗ trợ của chúng tôi.</p><p>Nếu bạn tin rằng một tài khoản đang lạm dụng danh tính của người khác, bạn có thể báo cáo trực tiếp từ hồ sơ của tài khoản đó với tư cách là người ngoài cuộc.</p>'
            },
            {
              slug: 'someone-is-using-my-email-address-what-can-i-do',
              title: 'Ai đó đang sử dụng địa chỉ email của tôi, tôi phải làm gì?',
              content:
                '<p>Bạn đang cố tạo tài khoản mới nhưng được thông báo rằng địa chỉ email hoặc số điện thoại của bạn đã được sử dụng? Bài viết hỗ trợ này giải thích cách địa chỉ email của bạn có thể đã được sử dụng và cách giải quyết vấn đề.</p><p>Bạn đang cố tạo tài khoản mới nhưng được thông báo rằng địa chỉ email hoặc số điện thoại của bạn đã được sử dụng? Bài viết hỗ trợ này giải thích cách địa chỉ email của bạn có thể đã được sử dụng và cách giải quyết vấn đề.</p>'
            }
          ]
        }
      ]
    },
    {
      avatarColor: 'error',
      icon: 'bx:clipboard',
      slug: 'rules-policies',
      title: 'Quy tắc và Chính sách',
      subCategories: [
        {
          slug: 'general',
          title: 'Chung',
          icon: 'bx:globe',
          articles: [
            {
              slug: 'our-rules',
              title: 'Quy tắc của chúng tôi',
              content:
                '<p>Mục đích của chúng tôi là phục vụ cuộc trò chuyện công khai. Bạo lực, quấy rối và các hành vi tương tự khác làm nản lòng mọi người trong việc thể hiện bản thân, và cuối cùng làm giảm giá trị của cuộc trò chuyện công khai toàn cầu. Quy tắc của chúng tôi nhằm đảm bảo tất cả mọi người có thể tham gia vào cuộc trò chuyện công khai một cách tự do và an toàn.</p><p>Mục đích của chúng tôi là phục vụ cuộc trò chuyện công khai. Bạo lực, quấy rối và các hành vi tương tự khác làm nản lòng mọi người trong việc thể hiện bản thân, và cuối cùng làm giảm giá trị của cuộc trò chuyện công khai toàn cầu. Quy tắc của chúng tôi nhằm đảm bảo tất cả mọi người có thể tham gia vào cuộc trò chuyện công khai một cách tự do và an toàn.</p>'
            },
            {
              slug: 'what-is-username-squatting-policy',
              title: 'Chính sách chiếm giữ tên người dùng là gì?',
              content:
                '<p>Chiếm giữ tên người dùng bị cấm theo Quy tắc.</p><p>Lưu ý rằng nếu một tài khoản không có cập nhật, không có ảnh hồ sơ, và không có ý định đánh lừa, thì thường không được coi là chiếm giữ tên hoặc giả mạo. Lưu ý rằng chúng tôi sẽ không giải phóng tên người dùng bị chiếm giữ trừ khi có vi phạm thương hiệu. Nếu báo cáo của bạn liên quan đến vi phạm thương hiệu, vui lòng tham khảo các chính sách đó để được hướng dẫn báo cáo các tài khoản này.</p><p>Các hành vi cố gắng bán, mua, hoặc chào mời các hình thức thanh toán khác để đổi lấy tên người dùng cũng là vi phạm và có thể dẫn đến đình chỉ tài khoản vĩnh viễn.</p><p>Chiếm giữ tên người dùng bị cấm theo Quy tắc.</p><p>Lưu ý rằng nếu một tài khoản không có cập nhật, không có ảnh hồ sơ, và không có ý định đánh lừa, thì thường không được coi là chiếm giữ tên hoặc giả mạo. Lưu ý rằng chúng tôi sẽ không giải phóng tên người dùng bị chiếm giữ trừ khi có vi phạm thương hiệu. Nếu báo cáo của bạn liên quan đến vi phạm thương hiệu, vui lòng tham khảo các chính sách đó để được hướng dẫn báo cáo các tài khoản này.</p><p>Các hành vi cố gắng bán, mua, hoặc chào mời các hình thức thanh toán khác để đổi lấy tên người dùng cũng là vi phạm và có thể dẫn đến đình chỉ tài khoản vĩnh viễn.</p>'
            },
            {
              slug: 'third-party-advertising-in-video-content',
              title: 'Quảng cáo bên thứ ba trong nội dung video',
              content:
                '<p>Bạn không được gửi, đăng, hoặc hiển thị bất kỳ nội dung video nào trên hoặc qua các dịch vụ của chúng tôi có chứa quảng cáo bên thứ ba, như quảng cáo video trước khi phát hoặc đồ họa tài trợ, mà không có sự đồng ý trước của chúng tôi.</p><p><strong>Lưu ý:</strong> Chúng tôi có thể cần thay đổi các quy tắc này theo thời gian để hỗ trợ mục tiêu thúc đẩy cuộc trò chuyện công khai lành mạnh.</p><p>Bạn không được gửi, đăng, hoặc hiển thị bất kỳ nội dung video nào trên hoặc qua các dịch vụ của chúng tôi có chứa quảng cáo bên thứ ba, như quảng cáo video trước khi phát hoặc đồ họa tài trợ, mà không có sự đồng ý trước của chúng tôi.</p><p><strong>Lưu ý:</strong> Chúng tôi có thể cần thay đổi các quy tắc này theo thời gian để hỗ trợ mục tiêu thúc đẩy cuộc trò chuyện công khai lành mạnh.</p>'
            }
          ]
        },
        {
          icon: 'bx:registered',
          slug: 'intellectual-property',
          title: 'Sở hữu trí tuệ',
          articles: [
            {
              slug: 'what-is-your-trademark-policy',
              title: 'Chính sách thương hiệu của bạn là gì?',
              content:
                '<p><strong>Bạn không được vi phạm quyền sở hữu trí tuệ của người khác, bao gồm bản quyền và thương hiệu.</strong></p><p>Thương hiệu là từ, logo, cụm từ, hoặc thiết bị phân biệt hàng hóa hoặc dịch vụ của chủ sở hữu thương hiệu trên thị trường. Luật thương hiệu có thể ngăn cản người khác sử dụng thương hiệu một cách trái phép hoặc gây nhầm lẫn.</p><p><strong>Bạn không được vi phạm quyền sở hữu trí tuệ của người khác, bao gồm bản quyền và thương hiệu.</strong></p><p>Thương hiệu là từ, logo, cụm từ, hoặc thiết bị phân biệt hàng hóa hoặc dịch vụ của chủ sở hữu thương hiệu trên thị trường. Luật thương hiệu có thể ngăn cản người khác sử dụng thương hiệu một cách trái phép hoặc gây nhầm lẫn.</p>'
            },
            {
              slug: 'what-are-counterfeit-goods',
              title: 'Hàng giả là gì?',
              content:
                '<p>Hàng giả là hàng hóa, bao gồm hàng hóa số, được quảng bá, bán, hoặc phân phối bằng cách sử dụng thương hiệu hoặc nhãn hiệu giống hệt hoặc không thể phân biệt với thương hiệu hoặc nhãn hiệu đã đăng ký của người khác, mà không có sự cho phép từ chủ sở hữu thương hiệu hoặc nhãn hiệu. Hàng giả cố gắng lừa người tiêu dùng tin rằng hàng giả là sản phẩm chính hãng của chủ sở hữu thương hiệu, hoặc tự quảng bá là hàng nhái, bản sao hoặc mô phỏng sản phẩm chính hãng.</p><p>Hàng giả là hàng hóa, bao gồm hàng hóa số, được quảng bá, bán, hoặc phân phối bằng cách sử dụng thương hiệu hoặc nhãn hiệu giống hệt hoặc không thể phân biệt với thương hiệu hoặc nhãn hiệu đã đăng ký của người khác, mà không có sự cho phép từ chủ sở hữu thương hiệu hoặc nhãn hiệu. Hàng giả cố gắng lừa người tiêu dùng tin rằng hàng giả là sản phẩm chính hãng của chủ sở hữu thương hiệu, hoặc tự quảng bá là hàng nhái, bản sao hoặc mô phỏng sản phẩm chính hãng.</p>'
            },
            {
              slug: 'what-types-of-copyright-complaints-do-you-respond-to',
              title: 'Bạn xử lý những loại khiếu nại bản quyền nào?',
              content:
                '<p>Chúng tôi xử lý các khiếu nại bản quyền được gửi theo Đạo luật Bản quyền Kỹ thuật số Thiên niên kỷ (“DMCA”). Điều 512 của DMCA nêu rõ các yêu cầu pháp lý cần thiết để báo cáo chính thức vi phạm bản quyền, cũng như cung cấp hướng dẫn về cách bên bị ảnh hưởng có thể kháng cáo việc gỡ bỏ bằng cách gửi thông báo phản đối phù hợp.</p><p>Nếu bạn lo ngại về việc sử dụng tên thương hiệu hoặc thực thể của bạn, vui lòng xem lại chính sách thương hiệu của chúng tôi. Nếu bạn lo ngại về tài khoản parody, nguồn tin, bình luận, hoặc tài khoản người hâm mộ, vui lòng xem chính sách liên quan tại đây. Những vấn đề này thường không phải là vấn đề bản quyền.</p><p>Chúng tôi xử lý các khiếu nại bản quyền được gửi theo Đạo luật Bản quyền Kỹ thuật số Thiên niên kỷ (“DMCA”). Điều 512 của DMCA nêu rõ các yêu cầu pháp lý cần thiết để báo cáo chính thức vi phạm bản quyền, cũng như cung cấp hướng dẫn về cách bên bị ảnh hưởng có thể kháng cáo việc gỡ bỏ bằng cách gửi thông báo phản đối phù hợp.</p><p>Nếu bạn lo ngại về việc sử dụng tên thương hiệu hoặc thực thể của bạn, vui lòng xem lại chính sách thương hiệu của chúng tôi. Nếu bạn lo ngại về tài khoản parody, nguồn tin, bình luận, hoặc tài khoản người hâm mộ, vui lòng xem chính sách liên quan tại đây. Những vấn đề này thường không phải là vấn đề bản quyền.</p>'
            }
          ]
        },
        {
          icon: 'bx:clipboard',
          slug: 'guidelines-for-law-enforcement',
          title: 'Hướng dẫn cho cơ quan thực thi pháp luật',
          articles: [
            {
              slug: 'does-we-have-access-to-user-generated-photos-or-videos',
              title: 'Chúng tôi có quyền truy cập vào ảnh hoặc video do người dùng tạo không?',
              content: `<p>Chúng tôi cung cấp lưu trữ ảnh cho một số ảnh tải lên (tức là ảnh từ pic.${themeConfig.templateName}.com) cũng như ảnh hồ sơ tài khoản và ảnh tiêu đề. Tuy nhiên, chúng tôi không phải là nhà cung cấp ảnh duy nhất cho các hình ảnh có thể xuất hiện trên nền tảng. Thông tin thêm về đăng ảnh trên nền tảng.</p><p>Chúng tôi cung cấp lưu trữ ảnh cho một số ảnh tải lên (tức là ảnh từ pic.${themeConfig.templateName}.com) cũng như ảnh hồ sơ tài khoản và ảnh tiêu đề. Tuy nhiên, chúng tôi không phải là nhà cung cấp ảnh duy nhất cho các hình ảnh có thể xuất hiện trên nền tảng. Thông tin thêm về đăng ảnh trên nền tảng.</p>`
            },
            {
              slug: 'data-controller',
              title: 'Bộ điều khiển dữ liệu',
              content:
                '<p>Đối với những người sống ở Hoa Kỳ hoặc bất kỳ quốc gia nào ngoài Liên minh Châu Âu hoặc Khu vực Kinh tế Châu Âu, bộ điều khiển dữ liệu chịu trách nhiệm về dữ liệu cá nhân là Công ty tại San Francisco, California. Đối với những người sống ở Liên minh Châu Âu hoặc Khu vực Kinh tế Châu Âu, bộ điều khiển dữ liệu là Công ty Quốc tế Vô hạn của chúng tôi tại Dublin, Ireland.</p><p>Đối với những người sống ở Hoa Kỳ hoặc bất kỳ quốc gia nào ngoài Liên minh Châu Âu hoặc Khu vực Kinh tế Châu Âu, bộ điều khiển dữ liệu chịu trách nhiệm về dữ liệu cá nhân là Công ty tại San Francisco, California. Đối với những người sống ở Liên minh Châu Âu hoặc Khu vực Kinh tế Châu Âu, bộ điều khiển dữ liệu là Công ty Quốc tế Vô hạn của chúng tôi tại Dublin, Ireland.</p>'
            },
            {
              slug: 'requests-for-Twitter-account-information',
              title: 'Yêu cầu thông tin tài khoản Twitter',
              content:
                '<p>Các yêu cầu thông tin tài khoản người dùng từ cơ quan thực thi pháp luật nên được gửi đến Công ty tại San Francisco, California hoặc Công ty Quốc tế Vô hạn tại Dublin, Ireland. Chúng tôi phản hồi các quy trình pháp lý hợp lệ được ban hành theo luật áp dụng.</p><p>Các yêu cầu thông tin tài khoản người dùng từ cơ quan thực thi pháp luật nên được gửi đến Công ty tại San Francisco, California hoặc Công ty Quốc tế Vô hạn tại Dublin, Ireland. Chúng tôi phản hồi các quy trình pháp lý hợp lệ được ban hành theo luật áp dụng.</p>'
            }
          ]
        }
      ]
    },
    {
      slug: 'chats',
      title: 'Trò chuyện',
      avatarColor: 'warning',
      icon: 'bx:message',
      subCategories: [
        {
          slug: 'general',
          title: 'Chung',
          icon: 'bx:globe',
          articles: [
            {
              slug: 'what-is-forwarding-limits',
              title: 'Giới hạn chuyển tiếp là gì?',
              content:
                '<p>Bạn có thể chuyển tiếp một tin nhắn đến tối đa năm cuộc trò chuyện cùng một lúc. Nếu một tin nhắn đã được chuyển tiếp, bạn có thể chuyển tiếp nó đến tối đa năm cuộc trò chuyện, bao gồm tối đa một nhóm.</p><p>Tuy nhiên, khi một tin nhắn được chuyển tiếp qua chuỗi năm cuộc trò chuyện trở lên, nghĩa là nó đã được chuyển tiếp ít nhất năm lần từ người gửi gốc, biểu tượng mũi tên kép và nhãn "Đã chuyển tiếp nhiều lần" sẽ hiển thị. Những tin nhắn này chỉ có thể được chuyển tiếp đến một cuộc trò chuyện tại một thời điểm, nhằm giữ các cuộc trò chuyện trên nền tảng thân mật và cá nhân. Điều này cũng giúp làm chậm sự lan truyền của tin đồn, tin nhắn lan truyền, và tin tức giả.</p><p>Bạn có thể chuyển tiếp một tin nhắn đến tối đa năm cuộc trò chuyện cùng một lúc. Nếu một tin nhắn đã được chuyển tiếp, bạn có thể chuyển tiếp nó đến tối đa năm cuộc trò chuyện, bao gồm tối đa một nhóm.</p><p>Tuy nhiên, khi một tin nhắn được chuyển tiếp qua chuỗi năm cuộc trò chuyện trở lên, nghĩa là nó đã được chuyển tiếp ít nhất năm lần từ người gửi gốc, biểu tượng mũi tên kép và nhãn "Đã chuyển tiếp nhiều lần" sẽ hiển thị. Những tin nhắn này chỉ có thể được chuyển tiếp đến một cuộc trò chuyện tại một thời điểm, nhằm giữ các cuộc trò chuyện trên nền tảng thân mật và cá nhân. Điều này cũng giúp làm chậm sự lan truyền của tin đồn, tin nhắn lan truyền, và tin tức giả.</p>'
            },
            {
              slug: 'what-is-last-seen-and-online',
              title: '"Lần cuối truy cập" và "Trực tuyến" là gì?',
              content:
                '<p>"Lần cuối truy cập" và "Trực tuyến" cho bạn biết lần cuối cùng liên hệ của bạn sử dụng ứng dụng, hoặc liệu họ đang trực tuyến.</p><p>Nếu một liên hệ đang trực tuyến, họ đang mở ứng dụng ở chế độ nền trước trên thiết bị và được kết nối với Internet. Tuy nhiên, điều này không nhất thiết có nghĩa là liên hệ đã đọc tin nhắn của bạn.</p><p>"Lần cuối truy cập" và "Trực tuyến" cho bạn biết lần cuối cùng liên hệ của bạn sử dụng ứng dụng, hoặc liệu họ đang trực tuyến.</p><p>Nếu một liên hệ đang trực tuyến, họ đang mở ứng dụng ở chế độ nền trước trên thiết bị và được kết nối với Internet. Tuy nhiên, điều này không nhất thiết có nghĩa là liên hệ đã đọc tin nhắn của bạn.</p>'
            },
            {
              slug: 'how-to-reply-to-a-message',
              title: 'Làm thế nào để trả lời một tin nhắn?',
              content:
                '<p>Bạn có thể sử dụng tính năng trả lời khi phản hồi một tin nhắn cụ thể trong cuộc trò chuyện cá nhân hoặc nhóm.</p><p>Chạm và giữ tin nhắn, sau đó nhấn Trả lời. Nhập phản hồi của bạn và nhấn Gửi. Ngoài ra, vuốt sang phải trên tin nhắn để trả lời.</p><p>Bạn có thể sử dụng tính năng trả lời khi phản hồi một tin nhắn cụ thể trong cuộc trò chuyện cá nhân hoặc nhóm.</p><p>Chạm và giữ tin nhắn, sau đó nhấn Trả lời. Nhập phản hồi của bạn và nhấn Gửi. Ngoài ra, vuốt sang phải trên tin nhắn để trả lời.</p>'
            }
          ]
        },
        {
          slug: 'features',
          title: 'Tính năng',
          icon: 'mdi:star-circle-outline',
          articles: [
            {
              slug: 'how-to-send-disappearing-messages',
              title: 'Làm thế nào để gửi tin nhắn tự hủy?',
              content:
                '<p>Tin nhắn tự hủy là một tính năng tùy chọn bạn có thể bật để tăng quyền riêng tư.</p><p>Khi bạn bật tin nhắn tự hủy, bạn có thể đặt tin nhắn biến mất sau 24 giờ, 7 ngày, hoặc 90 ngày kể từ khi chúng được gửi. Lựa chọn mới nhất chỉ áp dụng cho các tin nhắn mới trong cuộc trò chuyện. Bạn có thể chọn bật tin nhắn tự hủy cho tất cả cuộc trò chuyện hoặc chỉ các cuộc trò chuyện cụ thể. Cài đặt này không ảnh hưởng đến các tin nhắn bạn đã gửi hoặc nhận trước đó trong cuộc trò chuyện. Trong cuộc trò chuyện cá nhân, bất kỳ người dùng nào cũng có thể bật hoặc tắt tin nhắn tự hủy. Trong cuộc trò chuyện nhóm, bất kỳ thành viên nào cũng có thể bật hoặc tắt tin nhắn tự hủy. Tuy nhiên, quản trị viên nhóm có thể thay đổi cài đặt nhóm để chỉ quản trị viên mới có thể bật hoặc tắt tin nhắn tự hủy.</p><p>Tin nhắn tự hủy là một tính năng tùy chọn bạn có thể bật để tăng quyền riêng tư.</p><p>Khi bạn bật tin nhắn tự hủy, bạn có thể đặt tin nhắn biến mất sau 24 giờ, 7 ngày, hoặc 90 ngày kể từ khi chúng được gửi. Lựa chọn mới nhất chỉ áp dụng cho các tin nhắn mới trong cuộc trò chuyện. Bạn có thể chọn bật tin nhắn tự hủy cho tất cả cuộc trò chuyện hoặc chỉ các cuộc trò chuyện cụ thể. Cài đặt này không ảnh hưởng đến các tin nhắn bạn đã gửi hoặc nhận trước đó trong cuộc trò chuyện. Trong cuộc trò chuyện cá nhân, bất kỳ người dùng nào cũng có thể bật hoặc tắt tin nhắn tự hủy. Trong cuộc trò chuyện nhóm, bất kỳ thành viên nào cũng có thể bật hoặc tắt tin nhắn tự hủy. Tuy nhiên, quản trị viên nhóm có thể thay đổi cài đặt nhóm để chỉ quản trị viên mới có thể bật hoặc tắt tin nhắn tự hủy.</p>'
            },
            {
              slug: 'can-i-send-view-once-messages',
              title: 'Tôi có thể gửi tin nhắn xem một lần không?',
              content:
                '<p>Để tăng quyền riêng tư, bạn có thể gửi ảnh và video biến mất khỏi cuộc trò chuyện sau khi người nhận mở chúng một lần. Để sử dụng tính năng xem một lần, vui lòng cập nhật ứng dụng lên phiên bản mới nhất có sẵn cho thiết bị của bạn.</p><p>Để tăng quyền riêng tư, bạn có thể gửi ảnh và video biến mất khỏi cuộc trò chuyện sau khi người nhận mở chúng một lần. Để sử dụng tính năng xem một lần, vui lòng cập nhật ứng dụng lên phiên bản mới nhất có sẵn cho thiết bị của bạn.</p>'
            },
            {
              slug: 'how-to-pin-a-chat',
              title: 'Làm thế nào để ghim một cuộc trò chuyện?',
              content:
                '<p>Tính năng ghim cuộc trò chuyện cho phép bạn ghim tối đa ba cuộc trò chuyện cụ thể lên đầu danh sách trò chuyện để tìm nhanh.</p><p>Trên <strong>iPhone</strong>: Vuốt sang phải trên cuộc trò chuyện bạn muốn ghim, sau đó nhấn Ghim.</p><p>Trên <strong>Android</strong>: Chạm và giữ cuộc trò chuyện bạn muốn ghim, sau đó nhấn Ghim cuộc trò chuyện.</p><p>Tính năng ghim cuộc trò chuyện cho phép bạn ghim tối đa ba cuộc trò chuyện cụ thể lên đầu danh sách trò chuyện để tìm nhanh.</p><p>Trên <strong>iPhone</strong>: Vuốt sang phải trên cuộc trò chuyện bạn muốn ghim, sau đó nhấn Ghim.</p><p>Trên <strong>Android</strong>: Chạm và giữ cuộc trò chuyện bạn muốn ghim, sau đó nhấn Ghim cuộc trò chuyện.</p>'
            }
          ]
        },
        {
          slug: 'encryption',
          title: 'Mã hóa',
          icon: 'bx:lock-alt',
          articles: [
            {
              slug: 'what-is-end-to-end-encrypted-backup',
              title: 'Sao lưu mã hóa đầu cuối là gì?',
              content:
                '<p>Mã hóa đầu cuối đảm bảo chỉ bạn và người bạn đang giao tiếp có thể đọc hoặc nghe nội dung được gửi, và không ai ở giữa, kể cả chúng tôi. Với sao lưu mã hóa đầu cuối, bạn cũng có thể thêm lớp bảo vệ tương tự cho bản sao lưu của bạn trên iCloud hoặc Google Drive.</p><p>Mã hóa đầu cuối đảm bảo chỉ bạn và người bạn đang giao tiếp có thể đọc hoặc nghe nội dung được gửi, và không ai ở giữa, kể cả chúng tôi. Với sao lưu mã hóa đầu cuối, bạn cũng có thể thêm lớp bảo vệ tương tự cho bản sao lưu của bạn trên iCloud hoặc Google Drive.</p>'
            },
            {
              slug: 'can-i-change-password-for-end-to-end-encrypted-backup',
              title: 'Tôi có thể thay đổi mật khẩu cho sao lưu mã hóa đầu cuối không?',
              content:
                '<p>Khi bạn tạo sao lưu mã hóa đầu cuối, tin nhắn và phương tiện của bạn được lưu trữ trên đám mây và được bảo mật bằng mật khẩu hoặc khóa mã hóa 64 chữ số. Bạn có thể thay đổi mật khẩu bất kỳ lúc nào miễn là bạn có quyền truy cập vào mật khẩu hoặc khóa trước đó.</p><p><strong>Lưu ý:</strong> Bạn sẽ không thể khôi phục bản sao lưu nếu mất các cuộc trò chuyện và quên mật khẩu hoặc khóa. Chúng tôi không thể đặt lại mật khẩu hoặc khôi phục bản sao lưu cho bạn.</p><p>Khi bạn tạo sao lưu mã hóa đầu cuối, tin nhắn và phương tiện của bạn được lưu trữ trên đám mây và được bảo mật bằng mật khẩu hoặc khóa mã hóa 64 chữ số. Bạn có thể thay đổi mật khẩu bất kỳ lúc nào miễn là bạn có quyền truy cập vào mật khẩu hoặc khóa trước đó.</p><p><strong>Lưu ý:</strong> Bạn sẽ không thể khôi phục bản sao lưu nếu mất các cuộc trò chuyện và quên mật khẩu hoặc khóa. Chúng tôi không thể đặt lại mật khẩu hoặc khôi phục bản sao lưu cho bạn.</p>'
            },
            {
              slug: 'can-i-turnoff-end-to-end-encrypted-backup',
              title: 'Can I turnoff end-to-end encrypted backup?',
              content:
                '<p>You can choose to turn off end-to-end encrypted backup by using your password or key, or by authenticating with your biometrics or device PIN. If you turn off end-to-end encrypted backup, your messages and media will no longer back up to the cloud unless you set them up to do so.</p><p>You can choose to turn off end-to-end encrypted backup by using your password or key, or by authenticating with your biometrics or device PIN. If you turn off end-to-end encrypted backup, your messages and media will no longer back up to the cloud unless you set them up to do so.</p>'
            }
          ]
        }
      ]
    },
    {
      slug: 'connections',
      title: 'Connections',
      avatarColor: 'secondary',
      icon: 'bx:link',
      subCategories: [
        {
          slug: 'conversations',
          title: 'Conversations',
          icon: 'bx:message',
          articles: [
            {
              slug: 'how-to-send-messages-to-connections',
              title: 'How to send messages to connections?',
              content:
                "<p>You can send a message to your connections directly from the messaging page or connections page.</p><p>The sent message will be visible in the recipient's message list and possibly in their email, depending on their app notification settings.</p><p>You can send a message to your connections directly from the messaging page or connections page.</p><p>The sent message will be visible in the recipient's message list and possibly in their email, depending on their app notification settings.</p>"
            },
            {
              slug: 'how-to-edit-or-delete-a-sent-message-within-a-conversation',
              title: 'How to edit or delete a sent message within a conversation?',
              content:
                '<p>You can edit or delete a text only message you send on app.</p><p><strong>Note:</strong>You can only edit or delete a message within 60 minutes of sending the message.</p><p>You can edit or delete a text only message you send on app.</p><p><strong>Note:</strong>You can only edit or delete a message within 60 minutes of sending the message.</p>'
            },
            {
              slug: 'how-to-delete-a-message',
              title: 'How to delete a message?',
              content:
                "<p>A conversation thread starts when a message is sent to one or more people via app messaging. You can delete conversation threads individually or in bulk.</p><p><strong>Important:</strong>You can’t restore or access deleted messages. <strong>The conversation thread will only be deleted from your inbox and not from the recipient's.</strong></p><p>A conversation thread starts when a message is sent to one or more people via app messaging. You can delete conversation threads individually or in bulk.</p><p><strong>Important:</strong>You can’t restore or access deleted messages. <strong>The conversation thread will only be deleted from your inbox and not from the recipient's.</strong></p>"
            }
          ]
        },
        {
          slug: 'jobs',
          title: 'Jobs',
          icon: 'bx:briefcase-alt',
          articles: [
            {
              slug: 'find-relevant-jobs-through-social-hiring-and-meeting-the-team',
              title: 'Find relevant jobs through social hiring and meeting the team?',
              content:
                '<p>We have introduced two features that will help both job seekers and hirers fully engage with the power of their platform.</p> <ul><li>The #social hiring feature will notify members when a first- or second-degree connection is hiring for a relevant job. When a network connection posts a relevant job on app or adds a #hiring frame to their profile picture, app will notify the job seeker. From there, job seekers will be able to view open jobs that people in their network are hiring for.</li><li>When a member clicks on the job’s details page, they will see the “Meet the Hiring Team” feature. Members will be able to connect and message the entire team listed in this section, including the job poster.</li></ul><p>These features will allow members to find jobs through their connections and stand out to the hiring team. As a result, the hiring team will also be able to reach more potential candidates through their network.</p><p>We have introduced two features that will help both job seekers and hirers fully engage with the power of their platform.</p> <ul><li>The #social hiring feature will notify members when a first- or second-degree connection is hiring for a relevant job. When a network connection posts a relevant job on app or adds a #hiring frame to their profile picture, app will notify the job seeker. From there, job seekers will be able to view open jobs that people in their network are hiring for.</li><li>When a member clicks on the job’s details page, they will see the “Meet the Hiring Team” feature. Members will be able to connect and message the entire team listed in this section, including the job poster.</li></ul><p>These features will allow members to find jobs through their connections and stand out to the hiring team. As a result, the hiring team will also be able to reach more potential candidates through their network.</p>'
            },
            {
              slug: 'how-does-the-app-determine-when-a-job-is-relevant',
              title: 'How does the app determine when a job is relevant?',
              content:
                '<p>We will notify job seekers when someone in their network is hiring for a job that matches their current job title or industry listed in your profile or open to work preferences.</p><p>We will notify job seekers when someone in their network is hiring for a job that matches their current job title or industry listed in your profile or open to work preferences.</p>'
            },
            {
              slug: 'how-can-job-seekers-receive-these-notifications',
              title: 'How can job seekers receive these notifications?',
              content:
                '<p>Members will automatically receive notifications without having to opt in. To turn off the notification, click the three dots next to the notification and select Turn off.</p><p>Members will automatically receive notifications without having to opt in. To turn off the notification, click the three dots next to the notification and select Turn off.</p>'
            }
          ]
        },
        {
          slug: 'people',
          title: 'People',
          icon: 'bx:group',
          articles: [
            {
              slug: 'how-to-import-and-invite-your-email-contacts',
              title: 'How to import and invite your email contacts?',
              content:
                "<p>You can build your network by importing a list of your contacts you already know on the app. This will run a one-time upload of your address book contacts, as well as their detailed contact information. We periodically import and store details about your address book contacts to suggest relevant contacts for you to connect with, to show you relevant updates, and for other uses explained in our Privacy Policy. We'll never email anyone without your permission.</p><p>You can build your network by importing a list of your contacts you already know on the app. This will run a one-time upload of your address book contacts, as well as their detailed contact information. We periodically import and store details about your address book contacts to suggest relevant contacts for you to connect with, to show you relevant updates, and for other uses explained in our Privacy Policy. We'll never email anyone without your permission.</p>"
            },
            {
              slug: 'various-ways-to-connect-with-people',
              title: 'Various ways to connect with people?',
              content:
                '<p>Building your network is a great way to stay in touch with alumni, colleagues, and recruiters, as well as connect with new, professional opportunities. A primary email address is mandatory to send invitations. Members become 1st-degree connections when they accept your invitation.</p><p>First-degree connections are given access to any information you’ve displayed on your profile. To ensure an optimal site experience, the members can have a maximum of 30,000 1st-degree connections.</p><p>Building your network is a great way to stay in touch with alumni, colleagues, and recruiters, as well as connect with new, professional opportunities. A primary email address is mandatory to send invitations. Members become 1st-degree connections when they accept your invitation.</p><p>First-degree connections are given access to any information you’ve displayed on your profile. To ensure an optimal site experience, the members can have a maximum of 30,000 1st-degree connections.</p>'
            },
            {
              slug: 'how-to-follow-or-unfollow-people',
              title: 'How to follow or unfollow people?',
              content:
                "<p>When you follow someone, new content posted or shared by the person will be displayed in your feed. If you no longer wish to see the content of someone in your feed, you can always unfollow this person.</p><p>You can find people to follow from your feed, the Notifications tab, My Network page, or from the Search bar at the top of the page.</p><p>Unfollowing a person will hide all updates from them on your feed. If you're connected to a person and choose to unfollow them, you'll remain connected, but won't see their updates. They won't be notified that you've unfollowed them. The members will receive a notification if you begin following them again.</p><p>When you follow someone, new content posted or shared by the person will be displayed in your feed. If you no longer wish to see the content of someone in your feed, you can always unfollow this person.</p><p>You can find people to follow from your feed, the Notifications tab, My Network page, or from the Search bar at the top of the page.</p><p>Unfollowing a person will hide all updates from them on your feed. If you're connected to a person and choose to unfollow them, you'll remain connected, but won't see their updates. They won't be notified that you've unfollowed them. The members will receive a notification if you begin following them again.</p>"
            }
          ]
        }
      ]
    }
  ],
  keepLearning: [
    {
      slug: 'blogging',
      title: 'Blogging',
      img: '/images/pages/laptop.png',
      subtitle: 'Expert tips & tools to improve your website or online store using blog.'
    },
    {
      slug: 'inspiration-center',
      title: 'Inspiration Center',
      img: '/images/pages/bulb.png',
      subtitle: 'inspiration from experts to help you start and grow your big ideas.'
    },
    {
      slug: 'community',
      title: 'Community',
      img: '/images/pages/discord.png',
      subtitle: 'A group of people living in the same place or having a particular.'
    }
  ]
}

mock.onGet('/pages/help-center/landing').reply(() => {
  const allArticles: HelpCenterSubcategoryArticlesType[] = []

  data.categories.map(category =>
    category.subCategories.map(subCategory => subCategory.articles.map(article => allArticles.push(article)))
  )

  return [
    200,
    { allArticles, categories: data.categories, popularArticles: data.popularArticles, keepLearning: data.keepLearning }
  ]
})

mock.onGet('/pages/help-center/subcategory').reply(config => {
  const { category, subcategory } = config.params
  const filteredData = data.categories.filter(item => item.slug === category)

  return [
    200,
    {
      data: filteredData[0],
      categories: data.categories,
      activeTab: subcategory || filteredData[0].subCategories[0].slug
    }
  ]
})

mock.onGet('/pages/help-center/article').reply(config => {
  const { article, category, subcategory } = config.params

  const activeCategory = data.categories.filter(item => item.slug === category)[0]
  const activeSubcategory =
    activeCategory.subCategories.filter(item => item.slug === subcategory)[0] || activeCategory.subCategories[0]
  const activeArticle = activeSubcategory.articles.filter(item => item.slug === article)[0]

  return [200, { activeArticle, activeSubcategory, categories: data.categories, articles: activeSubcategory.articles }]
})
