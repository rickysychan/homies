class AuthorizeApiRequest
  prepend SimpleCommand
  def initialize(headers = {}, cookies={})
    @headers = headers
    @cookies = cookies
  end

  def call
    user
  end

  private

  attr_reader :headers, :cookies

  def user
    puts "user"
    # puts decoded_auth_token
    # puts decoded_auth_token[:token]
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    @user || errors.add(:token, 'Invalid token') && nil
  end

  def decoded_auth_token
    puts "decoded_auth_token"
    puts http_auth_header.inspect
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    puts @decoded_auth_token.inspect
    @decoded_auth_token
  end

  def http_auth_header
    puts "header"
    puts headers['Authorization']
    puts cookies
    puts cookies["token"]
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    else
      errors.add(:token, 'Missing token')
    end
    nil
  end
end
