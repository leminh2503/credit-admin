import React from "react";

export interface CommonReduxAction {
  type: string;
}

export interface CommonReactProps {
  children: React.ReactNode;
}

export interface ISettingId {
  _id?: string;
  themes?: string;
  location?: string;
  region?: string;
  language?: string;
  referCode?: string;
}

export enum IAccountRole {
  USER = 0,
  ADMIN = 1,
  ANONYMOUS = 2,
}

export interface IUserLogin {
  _id?: string;
  username?: string;
  email?: string;
  lastName?: string;
  firstName?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  facebook?: string;
  role?: IAccountRole;
  interactionId?: string;
  settingId?: ISettingId;
  hasPassword?: boolean;
}

export interface IProfile {
  _id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  avatar?: string;
  newEmail?: string;
}

export interface IAccountInfo {
  user?: IUserLogin;
  accessToken?: string;
  refreshToken?: string;
  isConfirmed?: boolean;
  dataProfile?: IProfile;
}
