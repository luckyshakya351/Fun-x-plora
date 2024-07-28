export const rupees = "₹";

export const baseUrl = "https://admin.funxplora.com";

// export const fron_end_main_domain = "https://sunlottery.fun";
export const fron_end_main_domain = "https://funxplora.com";


export const newdomain = "https://api.funxplora.com";

export const domain = "https://funxplora-timer.onrender.com";

export const support_mail = "";
// `support@sunlottrey.fun`;
export const telegram_url = "https://t.me/+9c__nUH79PtiYzBl";
export const facebook_url = "https://www.facebook.com/people/Funxplora-Gaming/61561351673648/";
export const instagram_url = "https://www.instagram.com/funxplora_gaming/";

// `https://t.me/SunLottaryOfficial`;

export const endpoint = {
  //node login api 
  login: `${newdomain}/api/v1/user_login`,
  
// login: `${baseUrl}/api/user_login`,
  send_otp: `${baseUrl}/api/forget-password`,
  veryfy_otp: `${baseUrl}/api/user-otp-verify`,
  signup: `${baseUrl}/api/user_register`,
  //node balance api
  userwallet: `${newdomain}/api/v1/userwallet`,
  // userwallet: `${baseUrl}/api/userwallet`,
  // top11winner: `https://game-zone-sql.onrender.com/api/v1/topw11winningInformation`,
  top11winner: `${baseUrl}/api/winning-list`,
  openbannerUrl: `${baseUrl}/popup`,
  profiledata: `${baseUrl}/api/profileapi`,
  // wingo
  // applybet: `${baseUrl}/api/bet`,
  // game_history: `${baseUrl}/api/colour_result`,
  // my_history: `${baseUrl}/api/getbet`,
  // my_history_all: `${baseUrl}/api/getbet-game-results`,

 // wingo node api 
  applybet: `${newdomain}/api/v1/bet`,
  game_history: `${newdomain}/api/v1/colour_result`,
  my_history_all: `${newdomain}/api/v1/getbet-game-results`,


  check_result: `${baseUrl}/api/checkresult`,
  color_winning: `${baseUrl}/api/colour_winning`,
  cash_deposit: `${baseUrl}/api/deposit`,
  payment_url: "https://vpayout.com/Upi_controller/insert_fund_request_online",
  withdraw_payment: `${baseUrl}/api/payout-request`,
  get_name_by_referral_code: `${baseUrl}/api/get-user-reffral-name`,
  payment_request: `${baseUrl}/api/deposit-request`,
  registration_bonus: `${baseUrl}/api/welcom-bonus`,
  deposit_history: `${baseUrl}/api/deposit-history`,
  withdrawl_history: `${baseUrl}/api/withdrawl-history`,
  deposit_bonus: `${baseUrl}/api/deposit-bonus`,
  referral_bonus: `${baseUrl}/api/refral-bonus`,
  daily_self_bet_income: `${baseUrl}/api/daily-self-bet-income`,
  daily_wallet_income: `${baseUrl}/api/daily-wallet-income`,
  daily_salary_income: `${baseUrl}/api/daily-salay-income`,
  weekly_salary_income: `${baseUrl}/api/weekly-salay-income`,
  team_reward_bonus: `${baseUrl}/api/team-reward-bonus`,
  team_trading_bonus: `${baseUrl}/api/team-trading-bonus`,
  add_bank_details: `${baseUrl}/api/bank-add`,
  get_bank_list: `${baseUrl}/api/user-bank-details`,
  promotion_data: `${newdomain}/api/v1/promotiondata`,
  promotion_data_node: `${newdomain}/api/v1/get-level`,
  all_withdrawl_user_list: `${baseUrl}/api/widthrol-user-list`,
  recharge_call_bakc: `${baseUrl}/api/deposits-user-request`,
  cricket_get_url_id_pass: `${baseUrl}/api/cricket-details`,

  // trx api's
  // trx_game_history: `${baseUrl}/api/trx-auto-genrated-result`,
  // trx_game_bet: `${baseUrl}/api/trx-bet`,
  // my_history_all_trx: `${baseUrl}/api/trx-getColourBets`,
  // my_history_all_trx_pending: `${baseUrl}/api/trx-getColourBets-results`,

  //node  trx api
  trx_game_history: `${newdomain}/api/v1/trx-auto-genrated-result`,
  my_history_all_trx: `${newdomain}/api/v1/trx-getColourBets`,
  trx_game_bet: `${newdomain}/api/v1/trx-bet`,

  // aviator api's
  aviator_login: `${baseUrl}/api/aviator/login`,
  get_data_by_user_id: `${baseUrl}/api/userProfile`,
  aviator_result: `${baseUrl}/api/aviator/result_cron`,
  total_bet_history: `${baseUrl}/api/aviator/total-bet-histroy`,
  bet_history: `${baseUrl}/api/aviator/bet_histroy`,
  result: `${baseUrl}/api/aviator/result`,
  wallet_data: `${baseUrl}/api/aviator/userwallet`,
  bet_now: `${baseUrl}/api/aviator/bet_now`,
  cash_out: `${baseUrl}/api/aviator/cash_out`,
  
  place_bid_jackpod: `${newdomain}/api/v1/place-bid-jackpod`,
  jackpod_my_history: `${newdomain}/api/v1/my-history-jackpod`,
  jackpod_game_history: `${newdomain}/api/v1/game-history-jackpod`,
  change_password: `${newdomain}/api/v1/change-password`,
};
