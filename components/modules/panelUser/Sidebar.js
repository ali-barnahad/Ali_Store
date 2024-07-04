// components\modules\panelUser\Sidebar.js
import styles from "@/styles/sidebarPanelUser.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import Swal from "sweetalert2";
import useTranslation from "@/hooks/useTranslation";

function Sidebar({ user }) {
  const { t } = useTranslation("common");
  const path = usePathname();
  const router = useRouter();

  const logoutHandler = () => {
    Swal.fire({
      title: t("areYouSureLogout"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yesLogout"),
      cancelButtonText: t("noCancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch("/api/logout", {
          method: "POST",
        });

        if (res.status === 200) {
          Swal.fire({
            title: t("logoutSuccess"),
            icon: "success",
            confirmButtonText: t("ok"),
          }).then(() => {
            router.replace("/");
          });
        }
      }
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <p className="text-center fs-5 bg-dark fw-bold rounded-2 text-light">
          {t("welcomeMessage")} {user.name}
        </p>
      </div>
      <ul className={styles.sidebarMain}>
        {path.includes("/panelUser") ? (
          <>
            <Link href={"/panelUser"} className={styles.sidebarLinkActive}>
              <ImReply />
              {t("dashboard")}
            </Link>
            <Link href={"/panelUser/tickets"}>
              <MdSms />
              {t("supportTickets")}
            </Link>
            <Link href={"/panelUser/comments"}>
              <FaComments />
              {t("comments")}
            </Link>
            <Link href={"/panelUser/wishList"}>
              <FaHeart />
              {t("wishlist")}
            </Link>
            <Link href={"/panelUser/profile"}>
              <TbListDetails />
              {t("accountDetails")}
            </Link>
          </>
        ) : (
          <>
            <Link href={"/panelAdmin"} className={styles.sidebarLinkActive}>
              <ImReply />
              {t("dashboard")}
            </Link>
            <Link href={"/panelAdmin/products"}>
              <FaShoppingBag />
              {t("products")}
            </Link>
            <Link href={"/panelAdmin/users"}>
              <FaUsers />
              {t("users")}
            </Link>
            <Link href={"/panelAdmin/comments"}>
              <FaComments />
              {t("comments")}
            </Link>
            <Link href={"/panelAdmin/tickets"}>
              <MdSms />
              {t("supportTickets")}
            </Link>
            <Link href={"/panelAdmin/discount"}>
              <MdOutlineAttachMoney />
              {t("discounts")}
            </Link>
          </>
        )}
      </ul>
      <div className={styles.logout} onClick={logoutHandler}>
        <MdLogout />
        {t("logout")}
      </div>
    </aside>
  );
}

export default Sidebar;
