class CreateFrogs < ActiveRecord::Migration
  def change
    create_table :frogs do |t|
      t.string :name
      t.integer :age

      t.timestamps
    end
  end
end
