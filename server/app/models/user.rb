class User < ApplicationRecord
  before_save :init_secret

  def response_attrs
    {
      name: name,
      token: token
    }
  end

  private
  def init_secret
    assign_attributes token: SecureRandom.hex(32)
  end
end
