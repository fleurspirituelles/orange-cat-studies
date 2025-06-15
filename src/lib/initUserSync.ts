import { observeUser } from "./authUser";
import { syncUser } from "./syncUser";
import { User } from "firebase/auth";

export function initUserSync() {
  observeUser(async (user: User | null) => {
    if (user) {
      try {
        const name = user.displayName ?? "Usuário";
        const email = user.email ?? "";
        await syncUser(name, email);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Erro ao sincronizar usuário:", err);
      }
    } else {
      localStorage.removeItem("user");
    }
  });
}