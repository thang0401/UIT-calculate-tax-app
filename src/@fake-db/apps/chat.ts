// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Types
import { ProfileUserType, ChatsObj, ContactType } from 'src/types/apps/chatTypes'

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)

const data: { chats: ChatsObj[]; contacts: ContactType[]; profileUser: ProfileUserType } = {
  profileUser: {
    id: 11,
    avatar: '/images/avatars/1.png',
    fullName: 'Nguyễn Văn Thanh',
    role: 'Quản trị viên',

    about: 'Lập trình viên',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false
    }
  },
  contacts: [
    {
      id: 1,
      fullName: 'Trần Thị Mai',
      role: 'Lập trình viên giao diện',

      //about: 'Tôi thích bánh flan và kẹo mút. Thỉnh thoảng tôi làm bánh quy tại nhà để thư giãn.',
      avatar: '/images/avatars/2.png',
      status: 'offline'
    },
    {
      id: 2,
      fullName: 'Lê Hoàng Nam',
      role: 'Nhà thiết kế UI/UX',
      avatarColor: 'primary',

      //about: 'Kẹo béo ngậy và bánh ngọt là niềm đam mê của tôi. Tôi thích làm bánh gừng và socola vào cuối tuần.',
      status: 'busy'
    },
    {
      id: 3,
      fullName: 'Phạm Hồng Nhung',
      role: 'Nhà quy hoạch đô thị',

      //about: 'Tôi thích làm bánh bông lan và ăn kẹo dẻo. Cuối tuần, tôi thường thử các công thức bánh mới.',
      avatar: '/images/avatars/8.png',
      status: 'busy'
    },
    {
      id: 4,
      fullName: 'Vũ Thị Lan',
      role: 'Nhà khoa học dữ liệu',

      //about: 'Kẹo mút và bánh quy là món khoái khẩu của tôi. Tôi thích làm bánh tart chanh dây vào dịp đặc biệt.',
      avatar: '/images/avatars/3.png',
      status: 'online'
    },
    {
      id: 5,
      fullName: 'Hoàng Minh Tuấn',
      role: 'Chuyên gia dinh dưỡng',
      avatarColor: 'success',

      //about: 'Bánh ngọt và kẹo là niềm vui của tôi. Tôi thích thử làm bánh flan với công thức mới.',
      status: 'busy'
    },
    {
      id: 6,
      fullName: 'Đỗ Văn Hùng',
      role: 'Chuyên viên marketing',

      //about:   'Tôi yêu thích kẹo béo ngậy và bánh quy socola. Cuối tuần, tôi thường làm bánh ngọt để chia sẻ với bạn bè.',
      avatar: '/images/avatars/5.png',
      status: 'online'
    },
    {
      id: 7,
      fullName: 'Ngô Thị Hương',
      role: 'Giáo viên giáo dục đặc biệt',

      //about: 'Bánh quy và kem là món tôi thích nhất. Tôi thường làm bánh bông lan để tặng người thân.',
      avatar: '/images/avatars/7.png',
      status: 'online'
    },
    {
      id: 8,
      fullName: 'Bùi Quang Vinh',
      role: 'Biên tập viên quảng cáo',

      //about: 'Kem và bánh gừng là sở thích của tôi. Tôi thích làm bánh socola và chia sẻ với đồng nghiệp.',
      avatar: '/images/avatars/6.png',
      status: 'away'
    },
    {
      id: 9,
      avatarColor: 'warning',
      fullName: 'Trương Thị Ngọc',
      role: 'Nhà thiết kế phim trường',

      //about: 'Tôi yêu thích kẹo dẻo và bánh ngọt. Thỉnh thoảng tôi làm bánh tart để thưởng thức cùng gia đình.',
      status: 'offline'
    },
    {
      id: 10,
      avatarColor: 'error',
      fullName: 'Lý Văn Dũng',
      role: 'Kỹ sư xây dựng',

      //about: 'Bánh flan và kẹo là món tôi thích. Tôi thường thử làm bánh quy vào cuối tuần.',
      status: 'away'
    }
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 1,
      chat: [
        {
          message: 'Chúng tôi có thể giúp gì cho bạn? Chúng tôi luôn sẵn sàng!',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Chào anh Thanh, tôi đang tìm mẫu giao diện admin tốt nhất. Anh có thể giúp tôi không?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Mẫu giao diện cần tương thích với MUI v5.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Chắc chắn rồi!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Mẫu giao diện này được xây dựng bằng MUI!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Trông giao diện rất sạch sẽ và hiện đại. 😍',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Nó rất phù hợp cho dự án tiếp theo của tôi.',
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Làm thế nào để tôi mua được nó?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Cảm ơn bạn! Bạn có thể mua từ trang web chính thức của chúng tôi 😇',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Tôi chắc chắn sẽ mua nó. 👍',
          time: previousDay,
          senderId: 1,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Chào',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Xin chào. Tôi có thể giúp gì cho bạn?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Tôi có thể xem chi tiết giao dịch tháng trước của tôi không? 🤔',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Chúng tôi cần kiểm tra xem có thể cung cấp thông tin đó không.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Tôi sẽ thông báo cho bạn khi có cập nhật.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true
          }
        },
        {
          message: 'Nếu mất nhiều thời gian, bạn có thể gửi mail cho tôi.',
          time: dayBeforePreviousDay,
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: false,
            isSeen: false
          }
        }
      ]
    }
  ]
}

const reorderChats = (arr: ChatsObj[], from: number, to: number) => {
  const item = arr.splice(from, 1)

  // ** Move the item to its new position
  arr.splice(to, 0, item[0])
}

// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
mock.onGet('/apps/chat/chats-and-contacts').reply(() => {
  const chatsContacts = data.chats.map((chat: ChatsObj) => {
    const contact = data.contacts.find((c: ContactType) => c.id === chat.userId)

    // @ts-ignore
    contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.chat[chat.chat.length - 1] }

    return contact
  })

  const contactsToShow = data.contacts.filter((co: ContactType) => {
    return !data.chats.some((ch: ChatsObj) => {
      return co.id === ch.id
    })
  })

  const profileUserData = {
    id: data.profileUser.id,
    avatar: data.profileUser.avatar,
    fullName: data.profileUser.fullName,
    status: data.profileUser.status
  }

  return [200, { chatsContacts, contacts: contactsToShow, profileUser: profileUserData }]
})

// ------------------------------------------------
// GET: Return User Profile
// ------------------------------------------------
mock.onGet('/apps/chat/users/profile-user').reply(() => [200, data.profileUser])

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock.onGet('/apps/chat/get-chat').reply(config => {
  // Get event id from URL
  let userId = config.params.id

  //  Convert Id to number
  userId = Number(userId)

  const chat = data.chats.find((c: ChatsObj) => c.id === userId)

  if (chat) chat.unseenMsgs = 0
  const contact = data.contacts.find((c: ContactType) => c.id === userId)

  // @ts-ignore
  if (contact.chat) contact.chat.unseenMsgs = 0

  return [200, { chat, contact }]
})

// ------------------------------------------------
// POST: Add new chat message
// ------------------------------------------------
mock.onPost('/apps/chat/send-msg').reply(config => {
  // Get event from post data
  const { obj } = JSON.parse(config.data).data

  let activeChat = data.chats.find((chat: ChatsObj) => chat.id === obj.contact.id)

  const newMessageData = {
    senderId: 11,
    time: new Date(),
    message: obj.message,
    feedback: {
      isSent: true,
      isSeen: false,
      isDelivered: false
    }
  }

  // If there's new chat for user create one
  let isNewChat = false

  if (activeChat === undefined) {
    isNewChat = true

    data.chats.push({
      id: obj.contact.id,
      userId: obj.contact.id,
      unseenMsgs: 0,
      chat: [newMessageData]
    })
    activeChat = data.chats[data.chats.length - 1]
  } else {
    activeChat.chat.push(newMessageData)
  }
  const response = { newMessageData, id: obj.contact.id }

  // @ts-ignore
  if (isNewChat) response.chat = activeChat

  reorderChats(
    data.chats,
    data.chats.findIndex(i => i.id === response.id),
    0
  )

  return [201, { response }]
})
