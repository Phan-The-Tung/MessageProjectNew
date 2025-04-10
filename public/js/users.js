// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// End Chức năng gửi yêu cầu

// Chức năng hủy yêu cầu kết bạn
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// End Chức năng hủy yêu cầu kết bạn

// Function từ chối lời mời kết bạn
const refuseFriend = (button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("refuse");
  
      const userId = button.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_FRIEND", userId);
    });
  };
// End Function từ chối lời mời kết bạn

// Chức năng từ chối lời mời kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    refuseFriend(button);
  });
}
// End Chức năng từ chối lời mời kết bạn

// Function chấp nhận lời mời kết bạn
const acceptFriend = (button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("accepted");
  
      const userId = button.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
    });
  };
  // End Function chấp nhận lời mời kết bạn
  
  // Chức năng chấp nhận lời mời kết bạn
  const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
  if (listBtnAcceptFriend.length > 0) {
    listBtnAcceptFriend.forEach((button) => {
      acceptFriend(button);
    });
  }
  // End Chức năng chấp nhận lời mời kết bạn