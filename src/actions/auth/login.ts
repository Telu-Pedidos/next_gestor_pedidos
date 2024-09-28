"use server";

import { LOGIN } from "@/functions/api";
import apiError from "@/functions/api-error";
import { LoginFormValues } from "@/validations/login-validation";
import { cookies } from "next/headers";

export default async function login(formData: LoginFormValues) {
  try {
    const { url } = LOGIN();

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Senha ou usuário inválidos.");
    }

    const data = await response.json();

    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
    });

    return { data: null, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
