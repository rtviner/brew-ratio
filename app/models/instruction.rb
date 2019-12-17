class Instruction < ApplicationRecord
  scope :by_brewMethod, -> (brewMethod) { where(brewMethod: brewMethod) if brewMethod.present? }
end
