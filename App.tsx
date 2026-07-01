import React, { useState, useEffect, useRef } from "react";

// Types
export type ChatTab = "casual" | "formal";

export interface Contact {
  id: string;
  name: string;
  number: string;
  avatarColor: string;
  avatarBg: string | null;
  blocked: boolean;
  notify: boolean;
  pinLock: string | null;
  lockType?: "pin" | "password" | null;
  bgGradient: string | null;
  bgImage: string | null;
  mode: ChatTab;
}

export interface Message {
  id: string;
  text: string;
  sender: "sender" | "receiver";
  timestamp: string;
  imgUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

// Prepopulated Casual Contacts (12)
const initialCasualContacts: Contact[] = [
  { id: "c1", name: "Abir", number: "01711-111111", avatarColor: "#FF5733", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c2", name: "Sumi", number: "01722-222222", avatarColor: "#33FF57", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c3", name: "Rafi", number: "01733-333333", avatarColor: "#3357FF", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c4", name: "Nadia", number: "01744-444444", avatarColor: "#FF33A5", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c5", name: "Touhid", number: "01755-555555", avatarColor: "#FFA533", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c6", name: "Mehzabin", number: "01766-666666", avatarColor: "#33FFF5", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c7", name: "Shuvo", number: "01777-777777", avatarColor: "#8E44AD", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c8", name: "Tonoya", number: "01788-888888", avatarColor: "#E67E22", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c9", name: "Imon", number: "01799-999999", avatarColor: "#1ABC9C", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c10", name: "Farhana", number: "01800-000000", avatarColor: "#E74C3C", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c11", name: "Riyad", number: "01811-111111", avatarColor: "#3498DB", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" },
  { id: "c12", name: "Sraboni", number: "01822-222222", avatarColor: "#F1C40F", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "casual" }
];

// Prepopulated Formal Contacts (12)
const initialFormalContacts: Contact[] = [
  { id: "f1", name: "CEO Karim", number: "01911-111111", avatarColor: "#2C3E50", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f2", name: "Manager Nahid", number: "01922-222222", avatarColor: "#34495E", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f3", name: "Senior Dev", number: "01933-333333", avatarColor: "#7F8C8D", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f4", name: "Client Riaz", number: "01944-444444", avatarColor: "#95A5A6", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f5", name: "Partner Sajib", number: "01955-555555", avatarColor: "#BDC3C7", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f6", name: "Project Lead", number: "01966-666666", avatarColor: "#E67E22", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f7", name: "HR Mim", number: "01977-777777", avatarColor: "#D35400", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f8", name: "Accountant", number: "01988-888888", avatarColor: "#F39C12", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f9", name: "Designer Arif", number: "01999-999999", avatarColor: "#16A085", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f10", name: "Sales Head", number: "01888-888888", avatarColor: "#27AE60", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f11", name: "Support Engr.", number: "01700-000001", avatarColor: "#2980B9", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" },
  { id: "f12", name: "Buyer Faysal", number: "01600-000002", avatarColor: "#8E44AD", avatarBg: null, blocked: false, notify: true, pinLock: null, bgGradient: null, bgImage: null, mode: "formal" }
];

// Preset Gradients (12)
const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
];

const emojiList = [
  "ðŸ˜€", "ðŸ˜ƒ", "ðŸ˜„", "ðŸ˜", "ðŸ˜†", "ðŸ˜…", "ðŸ˜‚", "ðŸ¤£", "ðŸ˜Š", "ðŸ˜‡", "ðŸ™‚", "ðŸ™ƒ", "ðŸ˜‰", "ðŸ˜Œ", "ðŸ˜", "ðŸ¥°", "ðŸ˜˜", "ðŸ˜—", "ðŸ˜™", "ðŸ˜š", "ðŸ˜‹", "ðŸ˜›", "ðŸ˜", "ðŸ˜œ", "ðŸ¤ª", "ðŸ¤ ", "ðŸ¥³", "ðŸ˜Ž", "ðŸ¤“", "ðŸ§",
  "ðŸ‘", "ðŸ‘Ž", "ðŸ‘Œ", "âœŒï¸", "ðŸ¤ž", "ðŸ¤Ÿ", "ðŸ¤˜", "ðŸ¤™", "ðŸ‘ˆ", "ðŸ‘‰", "ðŸ‘†", "ðŸ–•", "ðŸ‘‡", "â˜ï¸", "ðŸ¤", "ðŸ™", "ðŸ‘", "ðŸ™Œ", "ðŸ‘", "ðŸ¤²", "ðŸ’ª", "ðŸ§ ", "ðŸ‘€", "ðŸ”¥", "âœ¨", "ðŸŽ‰", "ðŸŒŸ", "ðŸŽˆ", "ðŸŽ‚", "ðŸŽ„",
  "â¤ï¸", "ðŸ§¡", "ðŸ’›", "ðŸ’š", "ðŸ’™", "ðŸ’œ", "ðŸ–¤", "ðŸ¤", "ðŸ’”", "â£ï¸", "ðŸ’•", "ðŸ’ž", "ðŸ’“", "ðŸ’—", "ðŸ’–", "ðŸ’˜", "ðŸ’", "ðŸŒ¸", "â­", "ðŸŒˆ", "â˜€ï¸", "ðŸŒ™", "â˜ï¸", "â„ï¸", "ðŸŒŠ", "â˜•", "ðŸ•", "ðŸŽ®", "ðŸ“±", "ðŸ’»"
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [currentMode, setCurrentMode] = useState<ChatTab>("casual");
  const [contacts, setContacts] = useState<Contact[]>(() => [
    ...initialCasualContacts,
    ...initialFormalContacts
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("c1");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    c1: [
      { id: "1", text: "Hello, how are you?", sender: "receiver", timestamp: "" },
      { id: "2", text: "I am fine!", sender: "sender", timestamp: "" }
    ]
  });
  const [msgInput, setMsgInput] = useState<string>("");
  const [statusAlert, setStatusAlert] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // New Contact states
  const [contactName, setContactName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [contactMode, setContactMode] = useState<ChatTab>("casual");

  // Dropdown open management
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Hidden file input references
  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const [bgUploadTargetId, setBgUploadTargetId] = useState<string | null>(null);

  // Hidden references for message attachments
  const messagePhotoInputRef = useRef<HTMLInputElement>(null);
  const messageFileInputRef = useRef<HTMLInputElement>(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  // Custom Lock/Unlock States
  const [isLockSetupModalOpen, setIsLockSetupModalOpen] = useState<boolean>(false);
  const [lockSetupContactId, setLockSetupContactId] = useState<string | null>(null);
  const [setupLockType, setSetupLockType] = useState<"pin" | "password">("pin");
  const [lockValue, setLockValue] = useState<string>("");
  const [lockValueConfirm, setLockValueConfirm] = useState<string>("");
  const [showLockSetupValue, setShowLockSetupValue] = useState<boolean>(false);

  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  const [unlockContactId, setUnlockContactId] = useState<string | null>(null);
  const [unlockInputValue, setUnlockInputValue] = useState<string>("");
  const [unlockError, setUnlockError] = useState<string>("");
  const [showUnlockValue, setShowUnlockValue] = useState<boolean>(false);
  const [mobileShowChat, setMobileShowChat] = useState<boolean>(false);

  // Mobile Logged In Profile and Application Settings States
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("Sajid Hasan");
  const [profilePhone, setProfilePhone] = useState<string>("+880 1712-345678");
  const [profileBio, setProfileBio] = useState<string>("Exploring SkyChat ðŸ“±âœ¨");
  const [profileAvatarColor, setProfileAvatarColor] = useState<string>("#128C7E");
  const [profileAvatarBg, setProfileAvatarBg] = useState<string | null>(null);

  // Settings active fields for editing
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isEditingPhone, setIsEditingPhone] = useState<boolean>(false);
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("Sajid Hasan");
  const [tempPhone, setTempPhone] = useState<string>("+880 1712-345678");
  const [tempBio, setTempBio] = useState<string>("Exploring SkyChat ðŸ“±âœ¨");

  // Application Preference Options
  const [settingsFontSize, setSettingsFontSize] = useState<"sm" | "base" | "lg">("base");
  const [settingsMuteSound, setSettingsMuteSound] = useState<boolean>(false);
  const [settingsOnlineStatus, setSettingsOnlineStatus] = useState<boolean>(true);
  const [settingsAppPIN, setSettingsAppPIN] = useState<string | null>(null);
  const [isAppPINLocked, setIsAppPINLocked] = useState<boolean>(false);
  const [appPINInput, setAppPINInput] = useState<string>("");
  const [appPINSetupOpen, setAppPINSetupOpen] = useState<boolean>(false);
  const [appPINSetupValue, setAppPINSetupValue] = useState<string>("");
  const [appPINSetupConfirm, setAppPINSetupConfirm] = useState<string>("");

  // Trigger Status Alerts
  const triggerAction = (msg: string) => {
    setStatusAlert(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // Helper to retrieve current filtered user list
  const currentUsers = contacts.filter((u) => u.mode === currentMode && !u.blocked);

  // Auto fallback when tab switches
  const handleToggleGlobalMode = () => {
    const nextMode = currentMode === "casual" ? "formal" : "casual";
    setCurrentMode(nextMode);
    setMobileShowChat(false); // Go back to contact list on mobile when toggling mode
    
    // Select first contact of the next mode (prefer unlocked if available)
    const firstOfNext = contacts.find((u) => u.mode === nextMode && !u.blocked);
    const unlockedOfNext = contacts.find((u) => u.mode === nextMode && !u.blocked && !u.pinLock);
    const targetContact = unlockedOfNext || firstOfNext;
    if (targetContact) {
      // In mobile, we don't force open the chat view tab instantly on mode toggle (keep sidebar)
      const user = contacts.find(u => u.id === targetContact.id);
      if (user && !user.pinLock) {
        setActiveChatId(targetContact.id);
        initializeChat(targetContact.id);
      } else {
        setActiveChatId(targetContact.id);
      }
    }
    triggerAction(nextMode === "casual" ? "Casual Mode" : "Formal Mode");
  };

  const handleSelectChat = (id: string) => {
    // Check if locked
    const user = contacts.find(u => u.id === id);
    if (user && user.pinLock) {
      // Trigger new elegant interactive unlock modal
      setUnlockContactId(id);
      setUnlockInputValue("");
      setUnlockError("");
      setShowUnlockValue(false);
      setIsUnlockModalOpen(true);
    } else {
      // Select directly
      setActiveChatId(id);
      initializeChat(id);
      setMobileShowChat(true); // Open chat view on mobile devices on selection
    }
  };

  const initializeChat = (id: string) => {
    // Retrieve or initialize conversation message array
    if (!messages[id]) {
      setMessages(prev => ({
        ...prev,
        [id]: [
          { id: "init", text: "Hello, connected!", sender: "receiver", timestamp: "" }
        ]
      }));
    }
  };

  const handleSendMessage = () => {
    if (!msgInput.trim()) return;
    const activeMsgList = messages[activeChatId] || [];
    const newMsg: Message = {
      id: String(Date.now()),
      text: msgInput,
      sender: "sender",
      timestamp: ""
    };
    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...activeMsgList, newMsg]
    }));
    setMsgInput("");
  };

  const handleMediaPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64Data = evt.target?.result as string;
      const activeMsgList = messages[activeChatId] || [];
      const newMsg: Message = {
        id: String(Date.now()),
        text: file.name,
        sender: "sender",
        timestamp: "",
        imgUrl: base64Data
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...activeMsgList, newMsg]
      }));
      triggerAction("ðŸ“¸ Photo sent successfully!");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleMediaFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let formattedSize = "Unknown size";
    if (file.size < 1024) {
      formattedSize = file.size + " B";
    } else if (file.size < 1048576) {
      formattedSize = (file.size / 1024).toFixed(1) + " KB";
    } else {
      formattedSize = (file.size / 1048576).toFixed(1) + " MB";
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64Data = evt.target?.result as string;
      const activeMsgList = messages[activeChatId] || [];
      const newMsg: Message = {
        id: String(Date.now()),
        text: file.name,
        sender: "sender",
        timestamp: "",
        fileUrl: base64Data,
        fileName: file.name,
        fileSize: formattedSize
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...activeMsgList, newMsg]
      }));
      triggerAction("ðŸ“Ž File attached successfully!");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const showAddContactModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setContactName("");
    setContactNumber("");
    setContactMode("casual");
  };

  const addNewContact = () => {
    if (!contactName.trim() || !contactNumber.trim()) {
      alert("Please enter Name and Number");
      return;
    }
    const newId = "extra_" + Date.now();
    const newContact: Contact = {
      id: newId,
      name: contactName,
      number: contactNumber,
      avatarColor: "#AAAAAA",
      avatarBg: null,
      blocked: false,
      notify: true,
      pinLock: null,
      bgGradient: null,
      bgImage: null,
      mode: contactMode
    };

    setContacts(prev => [...prev, newContact]);
    closeModal();
    triggerAction(`${contactName} added`);
    
    // Auto focus newly created contact if it matches active mode
    if (contactMode === currentMode) {
      setActiveChatId(newId);
      setMobileShowChat(true);
    }
  };

  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleOpenLockSetup = (id: string) => {
    const user = contacts.find(c => c.id === id);
    if (user) {
      setLockSetupContactId(id);
      setSetupLockType(user.lockType || "pin");
      setLockValue(user.pinLock || "");
      setLockValueConfirm(user.pinLock || "");
      setShowLockSetupValue(false);
      setIsLockSetupModalOpen(true);
    }
    setOpenDropdownId(null);
  };

  const handleSaveLockSetup = () => {
    if (!lockValue.trim()) {
      alert("PIN or Password cannot be empty!");
      return;
    }
    if (lockValue !== lockValueConfirm) {
      alert("Both fields must match!");
      return;
    }
    if (setupLockType === "pin" && !/^\d+$/.test(lockValue)) {
      alert("PIN code must be digits only (0-9)!");
      return;
    }

    setContacts(prev =>
      prev.map(c =>
        c.id === lockSetupContactId
          ? { ...c, pinLock: lockValue, lockType: setupLockType }
          : c
      )
    );
    
    const user = contacts.find(c => c.id === lockSetupContactId);
    const typeLabel = setupLockType === "pin" ? "PIN" : "Password";
    triggerAction(`Chat lock enabled for ${user?.name || "User"} (${typeLabel})`);
    setIsLockSetupModalOpen(false);
  };

  const handleRemoveLock = () => {
    setContacts(prev =>
      prev.map(c =>
        c.id === lockSetupContactId
          ? { ...c, pinLock: null, lockType: null }
          : c
      )
    );
    const user = contacts.find(c => c.id === lockSetupContactId);
    triggerAction(`Chat lock removed for ${user?.name || "User"}`);
    setIsLockSetupModalOpen(false);
  };

  const handleVerifyUnlock = () => {
    const user = contacts.find(c => c.id === unlockContactId);
    if (user) {
      if (unlockInputValue === user.pinLock) {
        setActiveChatId(user.id);
        setIsUnlockModalOpen(false);
        setUnlockInputValue("");
        setUnlockError("");
        initializeChat(user.id);
        setMobileShowChat(true); // Open unlocked chat on mobile
        triggerAction(`${user.name}'s chat unlocked`);
      } else {
        const typeLabel = user.lockType === "password" ? "Password" : "PIN";
        setUnlockError(`Incorrect ${typeLabel}! Please try again.`);
      }
    }
  };

  const toggleNotification = (id: string) => {
    setContacts(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextVal = !c.notify;
          triggerAction(`Notification ${nextVal ? "On" : "Off"}`);
          return { ...c, notify: nextVal };
        }
        return c;
      })
    );
    setOpenDropdownId(null);
  };

  const toggleBlock = (id: string) => {
    setContacts(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextVal = !c.blocked;
          triggerAction(`${c.name} is ${nextVal ? "Blocked" : "Unblocked"}`);
          return { ...c, blocked: nextVal };
        }
        return c;
      })
    );
    setOpenDropdownId(null);
    // If the active user gets blocked, focus on another active user
    if (activeChatId === id) {
      const otherUser = contacts.find(u => u.mode === currentMode && u.id !== id && !u.blocked);
      if (otherUser) {
        setActiveChatId(otherUser.id);
      }
    }
  };

  const setChatGradient = (id: string, grad: string) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, bgGradient: grad, bgImage: null } : c))
    );
    setOpenDropdownId(null);
    triggerAction("Gradient background set successfully");
  };

  const handleCustomBgUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setContacts(prev =>
            prev.map(c => (c.id === id ? { ...c, bgImage: ev.target?.result as string, bgGradient: null } : c))
          );
          triggerAction("Background image set successfully");
        }
      };
      reader.readAsDataURL(file);
    }
    setOpenDropdownId(null);
    setBgUploadTargetId(null);
    e.target.value = "";
  };

  const resetChatBg = (id: string) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, bgGradient: null, bgImage: null } : c))
    );
    setOpenDropdownId(null);
    triggerAction("Restored to default background");
  };

  const reportUser = (id: string) => {
    const user = contacts.find(c => c.id === id);
    if (user) {
      const reason = prompt(`Reason for reporting "${user.name}" (optional):`);
      alert(`Your report has been submitted.\nUser: ${user.name}\nReason: ${reason || "Not specified"}\nWe will take action shortly.`);
      triggerAction(`${user.name} reported`);
    }
    setOpenDropdownId(null);
  };

  // Close dropdowns on outer click
  useEffect(() => {
    const handleGlobalClick = () => {
      setOpenDropdownId(null);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const activeUser = contacts.find(u => u.id === activeChatId);

  // Background style computation for current chat pane
  const getChatWindowBgStyle = () => {
    if (!activeUser) return { background: "#efeae2" };
    if (activeUser.bgImage) {
      return {
        background: `url(${activeUser.bgImage}) center/cover no-repeat`,
        backgroundSize: "cover"
      };
    }
    if (activeUser.bgGradient) {
      return {
        background: activeUser.bgGradient
      };
    }
    return {
      background: "#efeae2"
    };
  };

  return (
    <div className="min-h-screen bg-[#dadbd4] flex justify-center items-center p-0 sm:p-3 select-none">
      
      {/* CSS Stylesheet Injector to replicate their exact CSS properties for layout compatibility */}
      <style>{`
        .master-container {
            display: flex;
            width: 1300px;
            max-width: 98vw;
            height: 90vh;
            background: #fff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 35px rgba(0,0,0,0.2);
        }
        .back-button {
            display: none !important;
        }
        @media (max-width: 768px) {
            .master-container {
                width: 100vw;
                max-width: 100vw;
                height: 100vh;
                height: 100dvh;
                border-radius: 0;
                box-shadow: none;
            }
            .master-container.show-sidebar .chat-sidebar {
                display: flex;
                width: 100%;
                height: 100%;
                border-right: none;
            }
            .master-container.show-sidebar .chat-window {
                display: none !important;
            }
            .master-container.show-chat .chat-sidebar {
                display: none !important;
            }
            .master-container.show-chat .chat-window {
                display: flex;
                width: 100%;
                height: 100%;
                min-height: 0;
            }
            .back-button {
                display: flex !important;
            }
            .action-icons i {
                font-size: 16px;
                margin-left: 10px;
            }
            .sidebar-header {
                padding: 12px;
            }
            .chat-window-header {
                padding: 10px 14px;
            }
            .message-area {
                padding: 12px;
            }
            .message {
                max-width: 85%;
            }
            .input-toolbar {
                padding: 10px;
                gap: 8px;
            }
            .input-toolbar i {
                font-size: 19px;
            }
            .input-toolbar input {
                padding: 8px 12px;
                font-size: 13px;
            }
        }
        .chat-sidebar {
            width: 320px;
            background: #f6f8fa;
            border-right: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .sidebar-header {
            padding: 16px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: 0.2s;
        }
        .logo-area { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: bold; }
        .mode-toggle {
            background: rgba(255,255,255,0.2);
            padding: 6px 12px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 13px;
            display: flex;
            gap: 6px;
            align-items: center;
        }
        .new-contact-btn {
            background: #fff;
            color: #128C7E;
            border: none;
            padding: 8px 12px;
            border-radius: 30px;
            margin: 12px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.2s;
        }
        .new-contact-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .chat-list {
            flex: 1;
            overflow-y: auto;
        }
        .chat-item {
            display: flex;
            align-items: center;
            padding: 12px;
            border-bottom: 1px solid #e9edef;
            cursor: pointer;
            position: relative;
        }
        .chat-item:hover { background: #eef2f5; }
        .avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            margin-right: 12px;
            background-size: cover;
            background-position: center;
            flex-shrink: 0;
        }
        .chat-info { flex: 1; min-w: 0; }
        .chat-name { font-weight: 600; display: flex; justify-content: space-between; align-items: center; }
        .dropdown-icon { cursor: pointer; padding: 6px; color: #666; transition: color 0.1s; }
        .dropdown-icon:hover { color: #111; }
        .dropdown-menu {
            position: absolute;
            right: 10px;
            top: 50px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.25);
            width: 260px;
            z-index: 100;
            display: block;
            padding: 8px 0;
            color: #333;
        }
        .dropdown-menu div {
            padding: 10px 16px;
            font-size: 13px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
        }
        .dropdown-menu div:hover {
            background-color: #f7f9fa;
        }
        .gradient-palette {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px;
        }
        .gradient-option {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 0 2px black;
        }
        .chat-window {
            flex: 1;
            display: flex;
            flex-direction: column;
            transition: background 0.3s;
            position: relative;
            height: 100%;
            min-height: 0;
        }
        .chat-window-header {
            background: #f0f2f5;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e0e0e0;
            z-index: 5;
        }
        .action-icons i {
            font-size: 20px;
            margin-left: 18px;
            cursor: pointer;
            color: #54656f;
            transition: color 0.2s;
        }
        .action-icons i:hover {
            color: #111;
        }
        .message-area {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
        }
        .message {
            max-width: 65%;
            padding: 8px 14px;
            border-radius: 18px;
            font-size: 14px;
            box-shadow: 0 1px 1.5px rgba(0,0,0,0.1);
        }
        .sender { background: #d9fdd3; align-self: flex-end; }
        .receiver { background: white; align-self: flex-start; }
        .input-toolbar {
            background: #f0f2f5;
            padding: 12px 16px;
            display: flex;
            gap: 12px;
            align-items: center;
            border-top: 1px solid #ddd;
            z-index: 5;
        }
        .input-toolbar i {
            font-size: 22px;
            color: #54656f;
            cursor: pointer;
            transition: color 0.2s;
        }
        .input-toolbar i:hover {
            color: #111;
        }
        .input-toolbar input {
            flex: 1;
            padding: 10px 16px;
            border: none;
            border-radius: 30px;
            outline: none;
            font-size: 14px;
        }
        .status-alert {
            background: #ffe6b3;
            padding: 8px;
            text-align: center;
            font-size: 13px;
            z-index: 10;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            color: #856404;
            border-bottom: 1px solid #ffeeba;
            font-weight: 500;
        }
        .modal {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 200;
        }
        .modal-content {
            background: white;
            padding: 24px;
            border-radius: 20px;
            width: 320px;
            max-width: 92vw;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .modal-content h3 {
            margin-bottom: 12px;
            font-size: 18px;
            color: #333;
        }
        .modal-content input, .modal-content select {
            width: 100%;
            margin: 8px 0;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            font-size: 14px;
        }
        .modal-btn {
            padding: 8px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            margin-top: 12px;
            margin-right: 8px;
        }
        .modal-btn.save {
            background: #128C7E;
            color: white;
        }
        .modal-btn.cancel {
            background: #e0e0e0;
            color: #333;
        }
      `}</style>

      {/* Embedded File input for local upload */}
      <input
        type="file"
        ref={bgImageInputRef}
        accept="image/*"
        id="bgImageInput"
        style={{ display: "none" }}
        onChange={(e) => {
          const targetId = bgUploadTargetId || openDropdownId;
          if (targetId) {
            handleCustomBgUpload(targetId, e);
          }
        }}
      />

      <div className={`master-container ${mobileShowChat ? "show-chat" : "show-sidebar"}`} id="appRoot">
        
        {/* SIDEBAR */}
        <div className="chat-sidebar">
          {showSettings ? (
            <div className="flex flex-col h-full bg-[#f8f9fa]" id="settingsPanelRoot">
              {/* Settings Header */}
              <div 
                className="sidebar-header" 
                id="settingsHeader" 
                style={{ background: currentMode === "casual" ? "#128C7E" : "#0078d4" }}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setShowSettings(false);
                      setIsEditingName(false);
                      setIsEditingPhone(false);
                      setIsEditingBio(false);
                    }} 
                    className="text-white hover:text-gray-200 transition-colors focus:outline-none flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                    title="Back to Chats"
                    id="settingsBackBtn"
                  >
                    <i className="fas fa-arrow-left text-base"></i>
                  </button>
                  <span className="font-semibold text-[17px] text-white">Settings</span>
                </div>
              </div>

              {/* Settings Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5" style={{ minHeight: 0 }}>
                
                {/* Profile Card Section */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center" id="settingsProfileCard">
                  <div className="relative group cursor-pointer mb-3">
                    <input 
                      type="file" 
                      accept="image/*" 
                      id="profilePicInput" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            setProfileAvatarBg(evt.target?.result as string);
                            triggerAction("Profile picture updated!");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl shadow-md border-4 border-white transition-opacity hover:opacity-90 relative"
                      style={{
                        backgroundColor: profileAvatarBg ? "transparent" : profileAvatarColor,
                        backgroundImage: profileAvatarBg ? `url(${profileAvatarBg})` : "none",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      onClick={() => document.getElementById("profilePicInput")?.click()}
                      title="Click to upload profile photo"
                    >
                      {!profileAvatarBg && profileName.charAt(0)}
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="fas fa-camera text-white text-base"></i>
                      </div>
                    </div>
                  </div>

                  {/* Profile Color Chooser if no custom bg */}
                  {!profileAvatarBg && (
                    <div className="flex gap-1.5 mb-4" id="avatarColorChooser">
                      {["#FF5733", "#33FF57", "#3357FF", "#FF33A5", "#FFA533", "#128C7E", "#8E44AD"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setProfileAvatarColor(c)}
                          className="w-5 h-5 rounded-full border border-white cursor-pointer shadow-sm transform hover:scale-110 transition-transform"
                          style={{ backgroundColor: c }}
                          title="Pick avatar color"
                        />
                      ))}
                    </div>
                  )}

                  {/* Profile Fields */}
                  <div className="w-full space-y-3 mt-1">
                    
                    {/* Name */}
                    <div className="border-b border-gray-100 pb-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Name</span>
                        {isEditingName ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                if (tempName.trim()) {
                                  setProfileName(tempName);
                                  setIsEditingName(false);
                                  triggerAction("Profile name updated!");
                                }
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-bold"
                            >
                              <i className="fas fa-check text-xs"></i>
                            </button>
                            <button onClick={() => { setIsEditingName(false); setTempName(profileName); }} className="text-gray-400 hover:text-gray-600">
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => { setIsEditingName(true); setTempName(profileName); }} className="text-gray-400 hover:text-gray-600" title="Edit Name">
                            <i className="fas fa-pencil-alt text-xs"></i>
                          </button>
                        )}
                      </div>
                      {isEditingName ? (
                        <input 
                          type="text" 
                          value={tempName} 
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                          placeholder="Type name..."
                        />
                      ) : (
                        <div className="text-sm font-semibold text-gray-800 mt-0.5">{profileName}</div>
                      )}
                    </div>

                    {/* Phone Number - Verified Mobile Login */}
                    <div className="border-b border-gray-100 pb-2">
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Registered Mobile (Login)</span>
                        {isEditingPhone ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                if (tempPhone.trim()) {
                                  setProfilePhone(tempPhone);
                                  setIsEditingPhone(false);
                                  triggerAction("Mobile number updated!");
                                }
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-bold"
                            >
                              <i className="fas fa-check text-xs"></i>
                            </button>
                            <button onClick={() => { setIsEditingPhone(false); setTempPhone(profilePhone); }} className="text-gray-400 hover:text-gray-600">
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => { setIsEditingPhone(true); setTempPhone(profilePhone); }} className="text-gray-400 hover:text-gray-600" title="Edit Mobile No.">
                            <i className="fas fa-pencil-alt text-xs"></i>
                          </button>
                        )}
                      </div>
                      {isEditingPhone ? (
                        <input 
                          type="text" 
                          value={tempPhone} 
                          onChange={(e) => setTempPhone(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                          placeholder="e.g. +880 1712-345678"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-800 mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono">{profilePhone}</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                            <i className="fas fa-check-circle"></i> Verified
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        <span>Bio / Status</span>
                        {isEditingBio ? (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setProfileBio(tempBio);
                                setIsEditingBio(false);
                                triggerAction("Status bio updated!");
                              }}
                              className="text-emerald-600 hover:text-emerald-700 font-bold"
                            >
                              <i className="fas fa-check text-xs"></i>
                            </button>
                            <button onClick={() => { setIsEditingBio(false); setTempBio(profileBio); }} className="text-gray-400 hover:text-gray-600">
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => { setIsEditingBio(true); setTempBio(profileBio); }} className="text-gray-400 hover:text-gray-600" title="Edit Bio">
                            <i className="fas fa-pencil-alt text-xs"></i>
                          </button>
                        )}
                      </div>
                      {isEditingBio ? (
                        <input 
                          type="text" 
                          value={tempBio} 
                          onChange={(e) => setTempBio(e.target.value)}
                          className="w-full mt-1 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                          placeholder="Type status..."
                        />
                      ) : (
                        <div className="text-xs text-gray-600 mt-1 break-words leading-relaxed">{profileBio}</div>
                      )}
                    </div>

                  </div>
                </div>

                {/* FontSize Setting Section */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 space-y-3" id="settingsFontSizeSection">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fas fa-font text-gray-500"></i> Chat Font Size
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["sm", "base", "lg"] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => {
                          setSettingsFontSize(sz);
                          triggerAction(`Font size updated to ${sz === 'sm' ? 'Small' : sz === 'lg' ? 'Large' : 'Medium'}!`);
                        }}
                        className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          settingsFontSize === sz
                            ? "bg-slate-800 text-white border-slate-800 shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                        }`}
                      >
                        {sz === "sm" && "Small"}
                        {sz === "base" && "Medium"}
                        {sz === "lg" && "Large"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sound & Notifications Settings */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 space-y-3" id="settingsAlertsSection">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fas fa-bell text-gray-500"></i> Alerts & Sounds
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="pr-2">
                        <div className="text-xs font-bold text-gray-700">Play message sound</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Play alert sound for incoming/outgoing chats</div>
                      </div>
                      <button
                        onClick={() => {
                          setSettingsMuteSound(!settingsMuteSound);
                          triggerAction(`Sounds ${!settingsMuteSound ? 'muted' : 'enabled'}!`);
                        }}
                        className={`w-10 h-5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${
                          !settingsMuteSound ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <div 
                          className={`w-4 h-4 rounded-full bg-white shadow-md absolute transition-transform ${
                            !settingsMuteSound ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    <hr className="border-gray-50" />

                    <div className="flex items-center justify-between">
                      <div className="pr-2">
                        <div className="text-xs font-bold text-gray-700">Active status (Online)</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Show other contacts that you are active</div>
                      </div>
                      <button
                        onClick={() => {
                          setSettingsOnlineStatus(!settingsOnlineStatus);
                          triggerAction(`Active status ${!settingsOnlineStatus ? 'shown' : 'hidden'}!`);
                        }}
                        className={`w-10 h-5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${
                          settingsOnlineStatus ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <div 
                          className={`w-4 h-4 rounded-full bg-white shadow-md absolute transition-transform ${
                            settingsOnlineStatus ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Master PIN Screen Security Lock */}
                <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 space-y-3" id="settingsSecuritySection">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <i className="fas fa-shield-alt text-gray-500"></i> Code Screen Lock
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="pr-2">
                        <div className="text-xs font-bold text-gray-700">Master Passcode Lock</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">Lock entire interface behind a 4-digit PIN!</div>
                      </div>
                      <button
                        onClick={() => {
                          if (settingsAppPIN) {
                            setSettingsAppPIN(null);
                            setIsAppPINLocked(false);
                            triggerAction("Security passcode disabled!");
                          } else {
                            setAppPINSetupOpen(true);
                            setAppPINSetupValue("");
                            setAppPINSetupConfirm("");
                          }
                        }}
                        className={`w-10 h-5 rounded-full transition-colors relative flex items-center cursor-pointer flex-shrink-0 ${
                          settingsAppPIN ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <div 
                          className={`w-4 h-4 rounded-full bg-white shadow-md absolute transition-transform ${
                            settingsAppPIN ? "translate-x-[22px]" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {settingsAppPIN && (
                      <div className="bg-gray-50 rounded-lg p-2.5 flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-gray-600">PIN enabled: <span className="font-mono">****</span></span>
                        <button
                          onClick={() => {
                            setIsAppPINLocked(true);
                            triggerAction("App temporarily locked!");
                          }}
                          className="bg-slate-700 text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[10px]"
                        >
                          <i className="fas fa-lock text-[8px]"></i> Lock Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Device Logs Details */}
                <div className="bg-[#f0f2f5] rounded-xl p-3 text-center space-y-1.5" id="settingsDevLogsCard">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Device Connection Status</div>
                  <div className="text-[10px] text-gray-600 leading-normal font-mono text-left bg-white p-2.5 rounded-lg border border-gray-150 font-medium">
                    <div className="flex justify-between border-b border-gray-100 pb-1 font-semibold"><span className="text-gray-400">Connection:</span> <span className="text-emerald-600">â— Live Protected</span></div>
                    <div className="flex justify-between border-b border-gray-100 py-1"><span className="text-gray-400">Verified ID:</span> <span>{profilePhone}</span></div>
                    <div className="flex justify-between border-b border-gray-150 py-1"><span className="text-gray-400">Device Platform:</span> <span>Web-Browser (Chrome)</span></div>
                    <div className="flex justify-between pt-1"><span className="text-gray-400">Secure Network IP:</span> <span>103.114.39.214</span></div>
                  </div>
                  <div className="text-[9px] text-gray-400 font-medium">SkyChat Hybrid Cloud v1.4.12</div>
                </div>

                {/* Secure Log-out button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setShowSettings(false);
                    triggerAction("Logged out successfully!");
                  }}
                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 py-3 rounded-2xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer outline-none mt-2"
                  id="settingsLogoutBtn"
                >
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </button>

              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div 
                className="sidebar-header" 
                id="sidebarHeader" 
                style={{ background: currentMode === "casual" ? "#128C7E" : "#0078d4" }}
              >
                <div className="logo-area">
                  <i className="fas fa-cloud-moon"></i> SkyChat
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="mode-toggle" onClick={handleToggleGlobalMode}>
                    <i className="fas fa-smile-wink"></i> 
                    <span id="modeLabel">{currentMode === "casual" ? "Casual" : "Formal"}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowSettings(true);
                      setTempName(profileName);
                      setTempPhone(profilePhone);
                      setTempBio(profileBio);
                    }}
                    className="text-white hover:text-gray-200 focus:outline-none flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-sm"
                    title="Open Settings"
                    id="sidebarSettingsBtn"
                  >
                    <i className="fas fa-cog text-base"></i>
                  </button>
                </div>
              </div>

              {/* New contact buttons */}
              <button 
                className="new-contact-btn" 
                onClick={showAddContactModal}
                style={{ color: currentMode === "casual" ? "#128C7E" : "#0078d4" }}
              >
                <i className="fas fa-user-plus"></i> New Contact
              </button>

              {/* Users List */}
              <div className="chat-list" id="chatListContainer">
                {currentUsers.map((user) => {
                  const isSelected = user.id === activeChatId;
                  return (
                    <div 
                      key={user.id} 
                      className="chat-item"
                      style={{ backgroundColor: isSelected ? "#eef2f5" : "transparent" }}
                      onClick={() => handleSelectChat(user.id)}
                    >
                      {/* Portrait */}
                      <div 
                        className="avatar"
                        style={{
                          backgroundColor: user.avatarBg ? "transparent" : user.avatarColor,
                          backgroundImage: user.avatarBg ? `url(${user.avatarBg})` : "none"
                        }}
                      >
                        {!user.avatarBg && user.name.charAt(0)}
                      </div>

                      {/* Contact brief info */}
                      <div className="chat-info">
                        <div className="chat-name">
                          <span className="truncate pr-1">
                            {user.name} {user.pinLock && "ðŸ”’"}
                          </span>
                          <i 
                            className="fas fa-chevron-down dropdown-icon" 
                            onClick={(e) => toggleDropdown(e, user.id)}
                          ></i>
                        </div>
                        <div className="chat-preview truncate text-gray-500 text-xs mt-0.5">
                          {user.number}
                        </div>
                      </div>

                      {/* Popup options context menu on specific clicked user */}
                      {openDropdownId === user.id && (
                        <div 
                          className="dropdown-menu" 
                          id={`dropdown-${user.id}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div onClick={() => handleOpenLockSetup(user.id)}>ðŸ”’ Chat Lock (PIN/Password)</div>
                          <div onClick={() => toggleNotification(user.id)}>ðŸ”” Notifications: {user.notify ? "On" : "Off"}</div>
                          <div onClick={() => toggleBlock(user.id)}>ðŸš« Block/Unblock</div>
                          
                          <div>
                            ðŸŽ¨ Gradient Background 
                            <div className="gradient-palette" id={`gradient-${user.id}`}>
                              {gradients.map((grad, gIdx) => (
                                <div 
                                  key={gIdx} 
                                  className="gradient-option" 
                                  style={{ background: grad }}
                                  onClick={() => setChatGradient(user.id, grad)}
                                />
                              ))}
                            </div>
                          </div>

                          <div onClick={(e) => {
                            e.stopPropagation();
                            setBgUploadTargetId(user.id);
                            bgImageInputRef.current?.click();
                          }}>
                            ðŸ–¼ï¸ Upload Custom Image
                          </div>
                          
                          <div onClick={() => resetChatBg(user.id)}>âŸ³ Default Background</div>
                          
                          <div 
                            style={{ borderTop: "1px solid #ccc", color: "#e74c3c" }} 
                            onClick={() => reportUser(user.id)}
                          >
                            âš ï¸ Report User
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* CHAT MAIN WINDOW */}
        <div className="chat-window" id="chatWindow" style={getChatWindowBgStyle()}>
          
          {/* Status notices banner */}
          {showAlert && (
            <div className="status-alert" id="statusAlert" style={{ display: "block" }}>
              {statusAlert}
            </div>
          )}

          {/* Chat header banner info */}
          {activeUser ? (
            <>
              <div className="chat-window-header">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Mobile Back Button */}
                  <button 
                    onClick={() => setMobileShowChat(false)}
                    className="back-button text-gray-600 hover:text-gray-900 focus:outline-none flex items-center justify-center p-1 cursor-pointer mr-0.5"
                    title="Back to contact list"
                    id="mobileBackBtn"
                  >
                    <i className="fas fa-arrow-left text-base"></i>
                  </button>

                  <div 
                    className="avatar" 
                    id="currentAvatar" 
                    style={{ 
                      backgroundColor: activeUser.avatarBg ? "transparent" : activeUser.avatarColor,
                      backgroundImage: activeUser.avatarBg ? `url(${activeUser.avatarBg})` : "none",
                      width: "40px",
                      height: "40px",
                      marginRight: 0
                    }}
                  >
                    {!activeUser.avatarBg && activeUser.name.charAt(0)}
                  </div>
                  <h3 id="currentChatName" className="font-semibold text-slate-800 text-sm sm:text-base">
                    {activeUser.name}
                  </h3>
                </div>
                
                {/* Simulated action triggers */}
                <div className="action-icons">
                  <i className="fas fa-phone-alt" onClick={() => triggerAction('ðŸ“ž Call initiated')}></i>
                  <i className="fas fa-video" onClick={() => triggerAction('ðŸ“¹ Video call')}></i>
                  <i className="fas fa-desktop" onClick={() => triggerAction('ðŸ–¥ï¸ Screen sharing')}></i>
                  <i className="fas fa-record-vinyl" onClick={() => triggerAction('ðŸ”´ Recording')}></i>
                </div>
              </div>

              {/* Message flow lists */}
              <div 
                className="message-area" 
                id="messageArea"
                style={{ background: activeUser.bgImage || activeUser.bgGradient ? "rgba(0,0,0,0.06)" : "transparent" }}
              >
                {(messages[activeChatId] || []).map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`message ${msg.sender === "sender" ? "sender" : "receiver"}`}
                    style={{ 
                      fontSize: settingsFontSize === "sm" ? "12px" : settingsFontSize === "lg" ? "16.5px" : "14px",
                      padding: msg.imgUrl ? "5px" : "8px 14px"
                    }}
                  >
                    {msg.imgUrl ? (
                      <div className="flex flex-col gap-1.5">
                        <img 
                          src={msg.imgUrl} 
                          alt="Sent attachment" 
                          className="max-w-[240px] max-h-[200px] sm:max-w-[320px] sm:max-h-[260px] rounded-lg object-cover bg-gray-50 border border-gray-100 shadow-xs" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : msg.fileUrl ? (
                      <div className="flex flex-col gap-1">
                        <a 
                          href={msg.fileUrl} 
                          download={msg.fileName || "attachment"} 
                          className="flex items-center gap-2.5 p-2 bg-black/5 hover:bg-black/10 rounded-lg decoration-none no-underline transition-all text-inherit cursor-pointer"
                          title="Click to download file"
                        >
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-700 flex-shrink-0 flex items-center justify-center shadow-xs">
                            <i className="fas fa-file-alt text-lg"></i>
                          </div>
                          <div className="overflow-hidden min-w-0 pr-2">
                            <div className="text-xs font-bold truncate text-[#111b21]">{msg.fileName}</div>
                            <div className="text-[10px] text-gray-500 font-semibold font-mono mt-0.5">{msg.fileSize}</div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-600 flex-shrink-0 shadow-xs hover:text-black">
                            <i className="fas fa-arrow-down text-xs"></i>
                          </div>
                        </a>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                ))}
              </div>

              {/* Toolbar foot input sender */}
              <div className="input-toolbar" style={{ position: "relative" }}>
                {/* Emoji Picker Popover */}
                {isEmojiPickerOpen && (
                  <div className="absolute bottom-[60px] left-4 bg-white border border-gray-200 rounded-xl shadow-xl w-[280px] p-3 z-[100] flex flex-col gap-2 animate-fade-in text-slate-800">
                    <div className="flex justify-between items-center pb-1.5 border-b border-gray-100">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Emoji</span>
                      <button 
                        onClick={() => setIsEmojiPickerOpen(false)}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xs cursor-pointer focus:outline-none"
                      >
                        âœ•
                      </button>
                    </div>
                    <div className="grid grid-cols-6 gap-2 max-h-[160px] overflow-y-auto pr-1">
                      {emojiList.map((emoji, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setMsgInput(prev => prev + emoji);
                          }}
                          className="hover:scale-125 transition-transform text-lg flex items-center justify-center p-1 rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hidden File Inputs */}
                <input 
                  type="file" 
                  ref={messagePhotoInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleMediaPhotoUpload}
                />
                <input 
                  type="file" 
                  ref={messageFileInputRef}
                  accept="*"
                  style={{ display: "none" }}
                  onChange={handleMediaFileUpload}
                />

                <i className="fas fa-microphone" onClick={() => triggerAction('ðŸŽ™ï¸ Voice recording active')}></i>
                <i className="fas fa-image" onClick={() => messagePhotoInputRef.current?.click()} title="Send Photo"></i>
                <i className="fas fa-paperclip" onClick={() => messageFileInputRef.current?.click()} title="Attach File"></i>
                <i className="fas fa-smile-wink" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} title="Select Emoji"></i>
                
                <input 
                  type="text" 
                  id="msgInput" 
                  placeholder="Type a message..." 
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onFocus={() => setIsEmojiPickerOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                
                <i 
                  className="fas fa-paper-plane" 
                  onClick={handleSendMessage} 
                  style={{ color: currentMode === "casual" ? "#128C7E" : "#0078d4" }}
                ></i>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-slate-400 p-8 text-center bg-[#efeae2]">
              <i className="fas fa-comments text-5xl text-gray-300 mb-2"></i>
              <p className="text-sm">Welcome to SkyChat! Please select a chat to start talking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog for saving new contact */}
      {isModalOpen && (
        <div id="contactModal" className="modal animate-fade-in">
          <div className="modal-content text-slate-800">
            <h3>New Contact</h3>
            <input 
              type="text" 
              id="contactName" 
              placeholder="Name" 
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
            <input 
              type="text" 
              id="contactNumber" 
              placeholder="Phone number" 
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <select 
              id="contactMode"
              value={contactMode}
              onChange={(e) => setContactMode(e.target.value as ChatTab)}
            >
              <option value="casual">Casual (Friends/Family)</option>
              <option value="formal">Formal (Office/Client)</option>
            </select>
            <button className="modal-btn save" onClick={addNewContact}>Save</button>
            <button className="modal-btn cancel" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Modal Dialog for setting PIN/Password lock */}
      {isLockSetupModalOpen && (
        <div className="modal animate-fade-in text-slate-800" style={{ zIndex: 300 }}>
          <div className="modal-content bg-white p-6 rounded-2xl w-[360px] max-w-full shadow-2xl relative">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <i className="fas fa-lock text-emerald-600"></i> Chat Lock Setup
              </h3>
              <button 
                type="button"
                onClick={() => setIsLockSetupModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4 bg-gray-50 p-2.5 rounded-lg border">
              Set lock type and passcode for <strong>"{contacts.find(c => c.id === lockSetupContactId)?.name}"</strong> to secure their chat.
            </p>

            {/* Mode selection tabs */}
            <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setSetupLockType("pin");
                  setLockValue("");
                  setLockValueConfirm("");
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  setupLockType === "pin"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-th"></i> PIN
              </button>
              <button
                type="button"
                onClick={() => {
                  setSetupLockType("password");
                  setLockValue("");
                  setLockValueConfirm("");
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  setupLockType === "password"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-key"></i> Password
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  {setupLockType === "pin" ? "Enter PIN (numeric only)" : "Enter Password"}
                </label>
                <div className="relative">
                  <input
                    type={showLockSetupValue ? "text" : "password"}
                    pattern={setupLockType === "pin" ? "[0-9]*" : undefined}
                    inputMode={setupLockType === "pin" ? "numeric" : undefined}
                    placeholder={setupLockType === "pin" ? "e.g. 1234" : "e.g. Abcd@123"}
                    value={lockValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (setupLockType === "pin" && val && !/^\d*$/.test(val)) {
                        return; // enforce numeric only in state for PIN
                      }
                      setLockValue(val);
                    }}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLockSetupValue(!showLockSetupValue)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <i className={`fas ${showLockSetupValue ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Confirm {setupLockType === "pin" ? "PIN" : "Password"}
                </label>
                <input
                  type={showLockSetupValue ? "text" : "password"}
                  pattern={setupLockType === "pin" ? "[0-9]*" : undefined}
                  inputMode={setupLockType === "pin" ? "numeric" : undefined}
                  placeholder={setupLockType === "pin" ? "Confirm PIN code" : "Confirm password"}
                  value={lockValueConfirm}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (setupLockType === "pin" && val && !/^\d*$/.test(val)) {
                      return; // enforce numeric only
                    }
                    setLockValueConfirm(val);
                  }}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <button 
                type="button"
                onClick={handleSaveLockSetup}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
              >
                <i className="fas fa-check-circle"></i> Enable Lock
              </button>

              {/* Show remove lock option only if there's already a lock set */}
              {contacts.find(c => c.id === lockSetupContactId)?.pinLock && (
                <button 
                  type="button"
                  onClick={handleRemoveLock}
                  className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 py-1.5 rounded-lg font-medium text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <i className="fas fa-trash-alt"></i> Disable Lock
                </button>
              )}

              <button 
                type="button"
                onClick={() => setIsLockSetupModalOpen(false)}
                className="w-full bg-gray-150 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg font-medium text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dialog for unlocking a chat */}
      {isUnlockModalOpen && (
        <div className="modal animate-fade-in text-slate-800" style={{ zIndex: 300 }}>
          <div className="modal-content bg-white p-6 rounded-2xl w-[320px] max-w-full text-center shadow-2xl relative">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl border border-emerald-100 shadow-inner animate-pulse">
              <i className="fas fa-lock text-emerald-600"></i>
            </div>

            <h3 className="font-semibold text-base text-gray-800">Chat is locked</h3>
            <p className="text-xs text-gray-505 mt-1 mb-4">
              Unlock access to talk to <strong>"{contacts.find(c => c.id === unlockContactId)?.name}"</strong>.
            </p>

            {/* Lock type badge indicator */}
            <div className="bg-emerald-50 text-emerald-800 text-xs py-1 px-3 rounded-full inline-flex items-center gap-1.5 mb-4 border border-emerald-100 font-medium font-sans">
              <i className={contacts.find(c => c.id === unlockContactId)?.lockType === "password" ? "fas fa-key" : "fas fa-th"}></i>
              {contacts.find(c => c.id === unlockContactId)?.lockType === "password" ? "Password lock active" : "PIN lock active"}
            </div>

            <div className="space-y-3 text-left">
              <div className="relative">
                <input
                  type={showUnlockValue ? "text" : "password"}
                  autoFocus
                  placeholder={
                    contacts.find(c => c.id === unlockContactId)?.lockType === "password"
                      ? "Enter password..."
                      : "Enter PIN..."
                  }
                  value={unlockInputValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    const isPin = contacts.find(c => c.id === unlockContactId)?.lockType !== "password";
                    if (isPin && val && !/^\d*$/.test(val)) {
                      return;
                    }
                    setUnlockInputValue(val);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleVerifyUnlock();
                    }
                  }}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-center text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowUnlockValue(!showUnlockValue)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <i className={`fas ${showUnlockValue ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>

              {unlockError && (
                <p className="text-rose-600 text-xs text-center font-medium bg-rose-50 py-1 px-2 rounded border border-rose-100 animate-pulse">
                  âŒ {unlockError}
                </p>
              )}
            </div>

            <div className="flex gap-2.5 mt-5">
              <button 
                type="button"
                onClick={() => {
                  setIsUnlockModalOpen(false);
                  setUnlockInputValue("");
                  setUnlockError("");
                }}
                className="flex-1 bg-gray-150 hover:bg-gray-200 text-gray-700 py-1.5 rounded-lg font-medium text-xs transition-colors"
              >
                Cancel
              </button>
              
              <button 
                type="button"
                onClick={handleVerifyUnlock}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <i className="fas fa-lock-open"></i> Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* master security lock screen overlay */}
      {settingsAppPIN && isAppPINLocked && (
        <div className="fixed inset-0 bg-[#f8f9fa] z-[9999] flex flex-col justify-center items-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full text-center border border-gray-100 flex flex-col items-center">
            <div className="bg-emerald-50 text-emerald-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl mb-4 shadow-sm animate-bounce">
              <i className="fas fa-lock text-emerald-600"></i>
            </div>
            <h3 className="font-bold text-xl text-gray-800">SkyChat Secure PIN</h3>
            <p className="text-xs text-gray-400 mt-1 mb-6">Enter your 4-digit security PIN to access your conversations</p>
            
            <div className="flex gap-3 justify-center mb-6">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 border-emerald-600 transition-all transform ${
                    appPINInput.length > idx ? "bg-emerald-600 scale-110" : "bg-transparent"
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 w-full mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (appPINInput.length < 4) {
                      const val = appPINInput + num;
                      setAppPINInput(val);
                      if (val === settingsAppPIN) {
                        setTimeout(() => {
                          setIsAppPINLocked(false);
                          setAppPINInput("");
                          triggerAction("Welcome back!");
                        }, 200);
                      } else if (val.length === 4) {
                        setTimeout(() => {
                          setAppPINInput("");
                          triggerAction("Incorrect security PIN! Try again.");
                        }, 300);
                      }
                    }
                  }}
                  className="bg-gray-100 py-3 text-lg font-semibold rounded-xl hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer focus:outline-none flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => {
                  setAppPINInput("");
                }}
                className="bg-gray-50 text-xs font-bold text-gray-500 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none flex items-center justify-center text-[10px]"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (appPINInput.length < 4) {
                    const val = appPINInput + "0";
                    setAppPINInput(val);
                    if (val === settingsAppPIN) {
                      setTimeout(() => {
                        setIsAppPINLocked(false);
                        setAppPINInput("");
                        triggerAction("Welcome back!");
                      }, 200);
                    } else if (val.length === 4) {
                      setTimeout(() => {
                        setAppPINInput("");
                        triggerAction("Incorrect security PIN! Try again.");
                      }, 300);
                    }
                  }
                }}
                className="bg-gray-100 py-3 text-lg font-semibold rounded-xl hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer focus:outline-none flex items-center justify-center"
              >
                0
              </button>
              <button
                onClick={() => {
                  if (appPINInput.length > 0) {
                    setAppPINInput(appPINInput.slice(0, -1));
                  }
                }}
                className="bg-gray-50 text-sm rounded-xl hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none flex items-center justify-center text-gray-600"
              >
                <i className="fas fa-backspace"></i>
              </button>
            </div>
            
            <div className="text-[10px] text-gray-400 font-medium">Logged in via: {profilePhone}</div>
          </div>
        </div>
      )}

      {/* Master PIN setup dialog modal */}
      {appPINSetupOpen && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 border border-gray-100">
            <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-2">
              <i className="fas fa-shield-alt text-emerald-600 text-lg"></i> Set Master App PIN
            </h3>
            <p className="text-xs text-gray-400 mb-4 font-semibold">Protect all your discussions and preferences behind a 4-digit entry PIN.</p>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Enter 4-Digit PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="e.g. 1234"
                  value={appPINSetupValue}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && !/^\d*$/.test(val)) return;
                    setAppPINSetupValue(val);
                  }}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-center text-lg tracking-widest bg-gray-50 font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Confirm PIN</label>
                <input
                  type="password"
                  maxLength={4}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="e.g. 1234"
                  value={appPINSetupConfirm}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && !/^\d*$/.test(val)) return;
                    setAppPINSetupConfirm(val);
                  }}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-center text-lg tracking-widest bg-gray-50 font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t border-gray-100">
              <button
                onClick={() => setAppPINSetupOpen(false)}
                className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (appPINSetupValue.length !== 4) {
                    triggerAction("PIN must be exactly 4-digits!");
                    return;
                  }
                  if (appPINSetupValue !== appPINSetupConfirm) {
                    triggerAction("PINs do not match!");
                    return;
                  }
                  setSettingsAppPIN(appPINSetupValue);
                  setIsAppPINLocked(true);
                  setAppPINSetupOpen(false);
                  triggerAction("Master application PIN enabled!");
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm cursor-pointer"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
