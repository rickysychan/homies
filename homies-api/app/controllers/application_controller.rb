class ApplicationController < ActionController::API
  def current_user
    # @current_user ||= User.find(session[:user_id]) if session[:user_id]
    @current_user ||= User.first if session[:user_id]
  end
  # helper_method :current_user

end
