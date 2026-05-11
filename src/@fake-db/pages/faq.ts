// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { FaqType } from 'src/@fake-db/types'

const data: { faqData: FaqType } = {
  faqData: {
    // Thanh toán
    payment: {
      id: 'payment',
      title: 'Thanh toán',
      icon: 'bx:credit-card',
      subtitle: 'Hỗ trợ về thanh toán',
      qandA: [
        {
          id: 'order-payment',
          question: 'Khi nào thanh toán cho đơn hàng của tôi được thực hiện?',
          answer:
            'Thanh toán được thực hiện trong quá trình đặt hàng khi bạn hoàn tất thanh toán. Mã số đơn hàng xuất hiện trên màn hình xác nhận cho biết thanh toán đã được xử lý thành công.'
        },
        {
          id: 'order',
          question: 'Tôi có thể thanh toán đơn hàng bằng cách nào?',
          answer:
            'Chúng tôi chấp nhận thanh toán qua Visa®, MasterCard®, American Express®, và PayPal®. Tất cả thông tin thanh toán được mã hóa trên máy chủ của chúng tôi, đảm bảo an toàn và bảo mật cho thông tin thẻ tín dụng của bạn.'
        },
        {
          id: 'placing-order',
          question: 'Tôi phải làm gì nếu gặp khó khăn khi đặt hàng?',
          answer:
            'Nếu bạn gặp bất kỳ vấn đề kỹ thuật nào trên trang web của chúng tôi, vui lòng liên hệ qua cổng hỗ trợ của chúng tôi, hoặc gọi đến số miễn phí 1800-123-456, hoặc gửi email tới donhang@congty.com.'
        },
        {
          id: 'users-license',
          question: 'Tôi cần loại giấy phép nào cho sản phẩm chỉ dành cho người dùng trả phí?',
          answer:
            'Nếu bạn có người dùng trả phí hoặc đang phát triển sản phẩm SaaS, bạn cần Giấy phép Mở rộng. Mỗi sản phẩm yêu cầu một giấy phép riêng. Bạn cũng sẽ nhận được các bản cập nhật miễn phí trọn đời.'
        },
        {
          id: 'subscription-review',
          question: 'Gói đăng ký của tôi có tự động gia hạn không?',
          answer:
            'Không, đây không phải là sản phẩm dựa trên đăng ký. Bánh pudding, bánh quy, kẹo dẻo, và bánh ngọt là những món chúng tôi yêu thích. Bạn chỉ cần thanh toán một lần duy nhất.'
        }
      ]
    },

    // Giao hàng
    delivery: {
      id: 'delivery',
      title: 'Giao hàng',
      icon: 'bx:cart',
      subtitle: 'Hỗ trợ về giao hàng',
      qandA: [
        {
          id: 'ship-order',
          question: 'Đơn hàng của tôi sẽ được giao như thế nào?',
          answer:
            'Đối với sản phẩm lớn, chúng tôi giao hàng qua công ty logistics bên thứ ba, cung cấp dịch vụ giao hàng tận nơi theo yêu cầu. Đối với sản phẩm nhỏ, chúng tôi cung cấp dịch vụ giao hàng bưu kiện miễn phí.'
        },
        {
          id: 'delivery-cost',
          question: 'Chi phí giao hàng cho đơn hàng của tôi là bao nhiêu?',
          answer:
            'Chi phí giao hàng theo lịch là 1.500.000 VNĐ hoặc 2.200.000 VNĐ mỗi đơn hàng, tùy thuộc vào mã bưu điện của điểm đến. Giao hàng bưu kiện thì miễn phí.'
        },
        {
          id: 'product-damaged',
          question: 'Tôi phải làm gì nếu sản phẩm đến nơi bị hư hỏng?',
          answer:
            'Chúng tôi sẽ thay thế ngay lập tức bất kỳ sản phẩm nào bị hư hỏng trong quá trình vận chuyển. Vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi trong vòng 48 giờ kể từ khi nhận sản phẩm để thông báo về tình trạng này.'
        }
      ]
    },

    // Hủy đơn & Trả hàng
    cancellationReturn: {
      icon: 'bx:rotate-left',
      id: 'cancellation-return',
      title: 'Hủy đơn & Trả hàng',
      subtitle: 'Hỗ trợ về hủy đơn và trả hàng',
      qandA: [
        {
          id: 'cancel-order',
          question: 'Tôi có thể hủy đơn hàng không?',
          answer:
            'Đơn hàng giao theo lịch có thể được hủy trước 72 giờ so với ngày giao hàng đã chọn để được hoàn tiền đầy đủ. Đơn hàng giao bưu kiện không thể hủy, nhưng chúng tôi có thể cung cấp nhãn trả hàng miễn phí theo yêu cầu.'
        },
        {
          id: 'product-return',
          question: 'Tôi có thể trả lại sản phẩm không?',
          answer:
            'Bạn có thể trả hàng trong vòng 15 ngày kể từ ngày nhận hàng bằng cách liên hệ với đội ngũ hỗ trợ của chúng tôi. Tất cả sản phẩm trả lại phải được đóng gói trong bao bì gốc kèm theo đầy đủ các phụ kiện đi kèm.'
        },
        {
          id: 'return-status',
          question: 'Tôi có thể kiểm tra trạng thái trả hàng ở đâu?',
          answer: 'Tìm đơn hàng trong mục Đơn hàng của bạn. Chọn trạng thái Trả hàng/Hoàn tiền.'
        }
      ]
    },

    // Đơn hàng của tôi
    myOrders: {
      id: 'my-orders',
      title: 'Đơn hàng của tôi',
      icon: 'bx-cube',
      subtitle: 'Chi tiết đơn hàng',
      qandA: [
        {
          id: 'order-success',
          question: 'Đơn hàng của tôi có thành công không?',
          answer:
            'Tất cả các giao dịch đơn hàng thành công sẽ nhận được email xác nhận đơn hàng sau khi được xử lý. Nếu bạn chưa nhận được email xác nhận trong vòng 24 giờ, hãy kiểm tra thư mục email rác hoặc spam. Ngoài ra, bạn có thể đăng nhập vào tài khoản để kiểm tra tóm tắt đơn hàng. Nếu không có tài khoản, vui lòng liên hệ với Đội ngũ Chăm sóc Khách hàng qua số 1800-123-456.'
        },
        {
          id: 'promo-code',
          question: 'Mã khuyến mãi của tôi không hoạt động, tôi phải làm gì?',
          answer:
            'Nếu bạn gặp vấn đề với mã khuyến mãi, vui lòng liên hệ với chúng tôi qua số 1800-123-456 để được hỗ trợ.'
        },
        {
          id: 'track-orders',
          question: 'Làm thế nào để theo dõi đơn hàng của tôi?',
          answer:
            'Nếu bạn có tài khoản, chỉ cần đăng nhập vào tài khoản và chọn “Đơn hàng của tôi”. Nếu bạn sử dụng tài khoản khách, hãy theo dõi đơn hàng tại đây bằng mã số đơn hàng và địa chỉ email.'
        }
      ]
    },

    // Sản phẩm & Dịch vụ
    productServices: {
      icon: 'bx:cog',
      id: 'product-services',
      title: 'Sản phẩm & Dịch vụ',
      subtitle: 'Hỗ trợ về sản phẩm và dịch vụ',
      qandA: [
        {
          id: 'shipping-notification',
          question: 'Tôi có được thông báo khi đơn hàng được giao không?',
          answer:
            'Có, chúng tôi sẽ gửi email thông báo khi đơn hàng của bạn được giao. Email này sẽ chứa thông tin theo dõi và chi tiết đơn hàng.'
        },
        {
          id: 'warranty-notification',
          question: 'Tôi có thể tìm thông tin bảo hành ở đâu?',
          answer:
            'Chúng tôi cam kết cung cấp sản phẩm chất lượng. Để biết thông tin về thời hạn bảo hành và dịch vụ bảo hành, hãy truy cập mục Bảo hành tại đây.'
        },
        {
          id: 'warranty-coverage',
          question: 'Làm thế nào để mua thêm gói bảo hành mở rộng?',
          answer:
            'Để đảm bảo sự yên tâm, chúng tôi cung cấp các gói bảo hành mở rộng, bổ sung thêm thời gian bảo vệ so với bảo hành tiêu chuẩn của nhà sản xuất. Để mua hoặc tìm hiểu thêm về chương trình bảo hành mở rộng, hãy truy cập mục Bảo hành Mở rộng tại đây.'
        }
      ]
    }
  }
}

mock.onGet('/pages/faqs').reply(config => {
  if (config.params) {
    const { q = '' } = config.params
    const queryLowered = q.toLowerCase()

    const filteredData: FaqType = {}
    Object.entries(data.faqData).forEach(entry => {
      const [categoryName, categoryObj] = entry
      const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
        return qAndAObj.question.toLowerCase().includes(queryLowered)
      })
      if (filteredQAndAOfCategory.length) {
        filteredData[categoryName] = {
          ...categoryObj,
          qandA: filteredQAndAOfCategory
        }
      }
    })

    return [200, { faqData: filteredData }]
  } else {
    return [200, data]
  }
})
