class CreateInstructions < ActiveRecord::Migration[5.1]
  def change
    create_table :instructions do |t|
      t.string :brewMethod
      t.string :grindSize
      t.text :steps

      t.timestamps
    end
  end
end
